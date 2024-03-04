# NestJS Security Library

This NestJS security library provides a comprehensive set of tools and features for securing NestJS applications.
Inspired by Spring Security, it offers various authentication mechanisms and protection against common security threats,
allowing you to secure your web applications quickly and efficiently.

## Installation

You can install the library via npm:

```bash
npm install nestjs-security
```

## Usage

This library supports multiple authentication mechanisms to suit your application's needs.

### Basic Authentication

Basic Authentication is a simple authentication scheme built into the HTTP protocol. It involves sending credentials (
usually username and password) in the HTTP request header.

```typescript
import {
    AuthorizeRequests,
    MemoryAuthentication,
    RequestMatcher,
    SecurityConfig,
    SecurityModule,
} from '@nestjs/security';
const builder = SecurityConfig.builder();
builder
    .httpSecurity()
    .authorize(
        AuthorizeRequests.builder()
            .requestMatcher(
                RequestMatcher
                    .builder()
                    .requestMatcher('/admin/*)')
                    .hasRole('ADMIN'),
            ),
    );

builder
    .authenticationBuilder()
    .authenticationProvider(
        builder.provide()
            .basicAuthentication()
            .realm('Nestjs Application')
    )
    .authenticator(
        builder.provide()
            .inMemoryAuthenticator()
            .addUser(
                MemoryAuthentication.with('user', 'password')
                    .withRoles('USER')
            )
            .addUser(
                MemoryAuthentication.with('admin', 'root')
                    .withRoles('ADMIN')
            )
    );
@Module({
    imports: [SecurityModule.forRoot(builder.build())],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
```

### Digest Authentication

Digest Authentication is an improvement over Basic Authentication that addresses some of its security shortcomings. It
involves sending hashed credentials in the HTTP request header.

```typescript
import {
    AuthorizeRequests,
    MemoryAuthentication,
    RequestMatcher,
    SecurityConfig,
    SecurityModule,
} from '@nestjs/security';
//TBC
```

### Session Authentication

Session Authentication is a traditional approach where the server maintains the session state for each authenticated
user. It typically involves using session cookies to identify authenticated users.

By default, this library provides a built-in authentication form for session-based authentication. However, you have the
flexibility to disable this default form and use your own custom authentication form if needed.

```typescript
import {
    AuthorizeRequests,
    MemoryAuthentication,
    RequestMatcher,
    SecurityConfig,
    SecurityModule,
} from '@nestjs/security';
//TBC
```

### JWT Authentication

JWT (JSON Web Token) Authentication is a stateless authentication mechanism where tokens containing user information are
sent with each request. This allows for scalable and efficient authentication in distributed systems.

```typescript
import {
    AuthorizeRequests,
    MemoryAuthentication,
    RequestMatcher,
    SecurityConfig,
    SecurityModule,
} from '@nestjs/security';
//TBC
```

### Configuration
You can configure the authentication strategies and other security features by providing options to the respective
guards.

```typescript
import {
    AuthorizeRequests,
    MemoryAuthentication,
    RequestMatcher,
    SecurityConfig,
    SecurityModule,
} from '@nestjs/security';
//TBC
```

## Examples

Check out the [examples](examples/) directory for complete usage examples.

## Contributing

Contributions are welcome! Please check out our [contribution guidelines](CONTRIBUTING.md) for details on how to
contribute to this project.

## License

This library is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.