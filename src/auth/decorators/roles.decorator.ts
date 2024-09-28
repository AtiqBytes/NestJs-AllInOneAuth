import { SetMetadata } from "@nestjs/common";
import { CLientRole } from "../enums/role.enum";

export const ROLES_METADATA_KEY = 'roles_decorator_key';

export const Roles = (...roles:CLientRole[])=>
    SetMetadata(ROLES_METADATA_KEY,roles)
