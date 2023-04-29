import { AppUser } from "./app-user.model";

export class AuthenticationResponse {
    user!: AppUser;
    tokens!: Map<string, string>;
}