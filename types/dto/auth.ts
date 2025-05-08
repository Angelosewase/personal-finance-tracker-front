export interface loginRequest {
    usernameOrEmail :string  
    password :string
}

export interface JwtAuthenticationResponse{
    accessToken:string 
    tokenType:string 
    
}