# WeatherAppSlm

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.5.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Environment Setup

This project uses environment files to manage API keys and other configuration. Follow these steps to set up your environment:

1. Navigate to the `src/environments` directory
2. Create `environment.local.ts` for development:
   ```typescript
   export const environment = {
       production: false,
       apiKey: 'YOUR_TOMORROW_IO_API_KEY_HERE'
   };
   ```
3. Create `environment.prod.ts` for production:
   ```typescript
   export const environment = {
       production: true,
       apiKey: 'YOUR_TOMORROW_IO_API_KEY_HERE'
   };
   ```

**Note:** Never commit your actual API keys to version control. The environment files containing real API keys are listed in `.gitignore`.

### Template Files
- `environment.template.ts` and `environment.prod.template.ts` are provided as templates
- Copy these files and rename them to `environment.local.ts` and `environment.prod.ts` respectively
- Replace the placeholder API key with your actual Tomorrow.io API key

### Security Best Practices
- Keep your API keys private and never share them
- Use environment variables in production
- Consider using a backend proxy to secure API keys in production
- Regularly rotate your API keys
- Monitor API usage for any unauthorized access

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
