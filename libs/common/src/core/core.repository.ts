import { Category } from '@app/schema/category.schema';
import { PAGE_SIZE } from '@app/utils/constants';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ClientSession,
  FilterQuery,
  Model,
  ProjectionType,
  QueryOptions,
  Types,
  UpdateQuery,
} from 'mongoose';

type CreateType<T> = {
  dto: T;
  session: ClientSession;
  category?: {
    fieldName?: string;
    id?: string;
    name?: string;
    type: ECategory;
  };
};

type PaginationType<T> = Partial<{
  page: number;
  startDate: string;
  endDate: string;
  pageSize: number;
  sort: Record<keyof T, 1 | -1>;
}>;

type FindType<T> = {
  filter: FilterQuery<T>;
  projection?: ProjectionType<T>;
  options?: QueryOptions<T>;
  pagination?: PaginationType<T>;
};

type UpdateType<T> = Pick<FindType<T>, 'filter' | 'options'> & {
  id?: string;
  update: UpdateQuery<T>;
  session: ClientSession;
};

export abstract class CoreRepository<T> {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
    protected readonly model: Model<T>, //must inject from service class
  ) {}

  async create({ dto, session, category }: CreateType<T>) {
    if (category) {
      let cat;
      if (!category.id && !category.name)
        throw new BadRequestException('Required category name or id');
      if (category.id) cat = await this.categoryModel.findById(category.id);
      else
        cat = await new this.categoryModel({
          name: category.name,
          _id: new Types.ObjectId(),
          createdAt: new Date(),
        }).save({ session });

      dto[category.fieldName ?? 'category'] = cat;
    }

    return await new this.model({
      ...dto,
      _id: new Types.ObjectId(),
      createdAt: new Date(),
    }).save({ session });
  }

  getPaginationOption({
    page,
    startDate,
    endDate,
    pageSize,
    sort,
  }: PaginationType<T>) {
    const pag = {};
    const fil = {};
    if (sort) pag['sort'] = sort;
    pag['skip'] = page ?? 1 * pageSize ?? PAGE_SIZE;
    pag['limit'] = pageSize ?? PAGE_SIZE;
    if (startDate) fil['createdAt'] = { $gte: startDate };
    if (endDate) fil['endDate'] = { $lte: endDate };

    return { pag, fil };
  }

  async find({ filter, projection, options, pagination }: FindType<T>) {
    const { pag, fil } = this.getPaginationOption(pagination);
    const docs = await this.model.find({ ...filter, ...fil }, projection, {
      lean: true,
      ...options,
      ...pag,
    });
    return { items: docs, total: await this.model.countDocuments() };
  }

  async findOne({
    filter,
    projection,
  }: Omit<FindType<T>, 'pagination' | 'options'>) {
    return await this.model.findOne(filter, projection, { lean: true });
  }

  async findById({
    id,
    projection,
  }: Pick<FindType<T>, 'projection'> & { id: string }) {
    return await this.model.findById(id, projection, { lean: true });
  }

  async findAndUpdate({ id, filter, options, update, session }: UpdateType<T>) {
    if (!id && !filter)
      throw new BadRequestException('Require filter to update');

    const prev = id
      ? await this.model.findById(id, null, { lean: true })
      : await this.model.findOne(filter, null, { lean: true });

    if (!prev) throw new NotFoundException('Not found');

    const updateOptions = [
      { ...update, updatedAt: new Date() },
      { ...options, lean: true, session, new: true },
    ];
    const next = id
      ? await this.model.findByIdAndUpdate(id, ...updateOptions)
      : await this.model.findOne(filter, ...updateOptions);

    return { prev, next };
  }

  async updateMany({
    ids,
    update,
    session,
  }: Omit<UpdateType<T>, 'id' | 'filter'> & { ids: string[] }) {
    const prev = await this.model.find({ _id: { $in: ids } }, null, {
      lean: true,
    });
    if (!prev || !prev.length) throw new NotFoundException('Not Found');

    await this.model.updateMany(
      { _id: { $in: ids } },
      { ...update, updatedAt: new Date() },
      { session },
    );

    const next = await this.model.find({ _id: { $in: ids } }, null, {
      lean: true,
    });

    return { prev, next };
  }
}
