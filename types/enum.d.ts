/* eslint-disable @typescript-eslint/no-unused-vars */

enum EValidator {
  IsString = 'IsString',
  IsNotEmpty = 'IsNotEmpty',
  IsEnum = 'IsEnum',
  IsBoolean = 'IsBoolean',
  IsIP = 'IsIP',
  Matches = 'Matches',
}

enum ERequestMethod {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
}

enum EApp {
  Admin = 'Admin',
  Class = 'Class',
  Community = 'Community',
  Misc = 'Misc',
  Payment = 'Payment',
  Permission = 'Permission',
  Spotlight = 'Spotlight',
  User = 'User',
}

enum ESchema {
  AppAuth = 'AppAuth',
  Audit = 'Audit',
  Category = 'Category',
  Club = 'Club',
  EntityMetaData = 'EntityMetaData',
  Field = 'Field',
  MetaData = 'MetaData',
  Option = 'Option',
  User = 'User',
}

enum EPath {}

enum EUser {
  SuperAdmin = 'SuperAdmin',
  Admin = 'Admin',
  Trainer = 'Trainer',
  Staff = 'Staff',
  Member = 'Member',
}

enum EField {
  String = 'String',
  Path = 'Path',
  Boolean = 'Boolean',
  URL = 'URL',
  Image = 'Image',
  Staff = 'Staff',
  User = 'User', //id_EUser
  Datetime = 'Datetime',
  Location = 'Location',
  Number = 'Number',
  Phone = 'Phone',
  Color = 'Color',
}

enum EStaff {
  General = 'General',
  Nutritionist = 'Nutritionist',
  Doctor = 'Doctor',
}

enum ECategory {
  Option = 'Option',
  SuperAdmin = 'SuperAdmin',
  Admin = 'Admin',
  Trainer = 'Trainer',
  GeneralStaff = 'GeneralStaff',
  Nutritionist = 'Nutritionist',
  Doctor = 'Doctor',
  Member = 'Member',
}

enum EEntityMedtada {
  Option = 'Option',
  User = 'User',
  Club = 'Club',
}
