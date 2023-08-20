import {applyDecorators, SetMetadata, UseGuards} from '@nestjs/common';
import {Roles} from "../../users/interfaces/roles.enum";
import {JwtAuthGuard} from "../../guards/jwt-auth-guard/jwt-auth.guard";
import {IsAdminGuard} from "../../guards/isadmin/isadmin.guard";

export const AuthAs = (role : Roles) => applyDecorators(
    SetMetadata( 'auth-as', role),
    UseGuards(JwtAuthGuard, IsAdminGuard)
)
