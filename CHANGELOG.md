# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.2.2] - 2026-10-26

### Added
- Portal narrativo de entrada con identidad editorial, tres actos y menús por situación antes de entrar en la plataforma.
- API POST /api/onboarding con validación estricta, límite de tamaño, rate limit y recomendaciones sin PII.
- Cinco rutas de 10 minutos (primeros días, empleo, trámites, idioma, IA/Office) localizadas en ES/PT/EN/CA.
- Persistencia local del objetivo y de la ruta sin cuenta, integrada con el motor de itinerarios existente.
- Pruebas de contrato, normalización de idioma y ausencia de datos personales en la respuesta.

### Changed
- La primera visita muestra el portal premium antes de la aplicación; el onboarding modal anterior deja de ser la entrada principal.
- La recomendación se puede revisar de nuevo desde el pie mediante el evento manos:open-portal.

### Security
- La API de onboarding limita cuerpo, método, tipo de contenido y frecuencia; no almacena datos de la persona usuaria.

## [Unreleased]

### Added
- Initial project structure
- CI/CD pipeline with GitHub Actions
- Security scanning with CodeQL and Gitleaks
- Dependabot configuration for automated dependency updates
- Governance files (CODEOWNERS, SECURITY.md, CONTRIBUTING.md, CODE_OF_CONDUCT.md)

### Changed
- Updated GitHub Actions to v5
- Removed `--if-present` from CI scripts
- Added explicit `continue-on-error: false` to security jobs

## [1.0.0] - 2026-10-25

### Added
- Initial release
- Core application features
- Documentation
