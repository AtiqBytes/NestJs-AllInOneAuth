
import { SetMetadata } from "@nestjs/common";
import { ClientPermission } from './../enums/permission.enum';

export const PERMISSIONS_METADATA_KEY = 'permissions_decorator_key';

export const Permissions = (...permissions:ClientPermission[])=>
    SetMetadata(PERMISSIONS_METADATA_KEY,permissions)
