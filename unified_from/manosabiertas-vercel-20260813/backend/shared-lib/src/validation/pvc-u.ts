/**
 * PVC-U Validation Framework
 * Esferas 1-7 (Structural, Semantic, State, Security, Protocol, Integrity, Compliance)
 */

import { BadRequestException, UnauthorizedException, ForbiddenException } from '@nestjs/common';

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  sphere: number;
}

export interface ValidationError {
  sphere: number;
  field: string;
  message: string;
  code: string;
}

// ════════ ESFERA 1: STRUCTURAL ════════
export function validateStructure(data: unknown, schema: Record<string, string>): ValidationResult {
  const errors: ValidationError[] = [];

  if (typeof data !== 'object' || data === null) {
    errors.push({
      sphere: 1,
      field: 'root',
      message: 'Input must be an object',
      code: 'INVALID_TYPE',
    });
    return { valid: false, errors, sphere: 1 };
  }

  const obj = data as Record<string, unknown>;

  for (const [field, type] of Object.entries(schema)) {
    const value = obj[field];
    const actualType = Array.isArray(value) ? 'array' : typeof value;

    if (actualType !== type && value !== undefined) {
      errors.push({
        sphere: 1,
        field,
        message: `Expected ${type}, got ${actualType}`,
        code: 'TYPE_MISMATCH',
      });
    }
  }

  return { valid: errors.length === 0, errors, sphere: 1 };
}

// ════════ ESFERA 2: SEMANTIC ════════
export function validateSemantic(email: string, url: string = ''): ValidationResult {
  const errors: ValidationError[] = [];

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errors.push({
      sphere: 2,
      field: 'email',
      message: 'Invalid email format',
      code: 'INVALID_EMAIL',
    });
  }

  if (url && !url.startsWith('http')) {
    errors.push({
      sphere: 2,
      field: 'url',
      message: 'URL must start with http/https',
      code: 'INVALID_URL',
    });
  }

  return { valid: errors.length === 0, errors, sphere: 2 };
}

// ════════ ESFERA 3: STATE ════════
export function validateState(state: 'active' | 'inactive' | 'pending'): ValidationResult {
  const validStates = ['active', 'inactive', 'pending'];
  const errors: ValidationError[] = [];

  if (!validStates.includes(state)) {
    errors.push({
      sphere: 3,
      field: 'state',
      message: `Invalid state. Must be one of: ${validStates.join(', ')}`,
      code: 'INVALID_STATE',
    });
  }

  return { valid: errors.length === 0, errors, sphere: 3 };
}

// ════════ ESFERA 4: SECURITY ════════
export function validateSecurity(password: string): ValidationResult {
  const errors: ValidationError[] = [];

  if (password.length < 8) {
    errors.push({
      sphere: 4,
      field: 'password',
      message: 'Password must be at least 8 characters',
      code: 'WEAK_PASSWORD',
    });
  }

  if (!/[A-Z]/.test(password)) {
    errors.push({
      sphere: 4,
      field: 'password',
      message: 'Password must contain at least one uppercase letter',
      code: 'NO_UPPERCASE',
    });
  }

  if (!/[0-9]/.test(password)) {
    errors.push({
      sphere: 4,
      field: 'password',
      message: 'Password must contain at least one number',
      code: 'NO_NUMBER',
    });
  }

  return { valid: errors.length === 0, errors, sphere: 4 };
}

// ════════ ESFERA 5: PROTOCOL ════════
export function validateProtocol(method: string, endpoint: string): ValidationResult {
  const errors: ValidationError[] = [];
  const validMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

  if (!validMethods.includes(method.toUpperCase())) {
    errors.push({
      sphere: 5,
      field: 'method',
      message: `Invalid HTTP method: ${method}`,
      code: 'INVALID_METHOD',
    });
  }

  if (!endpoint.startsWith('/')) {
    errors.push({
      sphere: 5,
      field: 'endpoint',
      message: 'Endpoint must start with /',
      code: 'INVALID_ENDPOINT',
    });
  }

  return { valid: errors.length === 0, errors, sphere: 5 };
}

// ════════ ESFERA 6: INTEGRITY ════════
export function validateIntegrity(hash: string, expected: string): ValidationResult {
  const errors: ValidationError[] = [];

  if (hash !== expected) {
    errors.push({
      sphere: 6,
      field: 'hash',
      message: 'Integrity check failed: hash mismatch',
      code: 'INTEGRITY_FAILED',
    });
  }

  return { valid: errors.length === 0, errors, sphere: 6 };
}

// ════════ ESFERA 7: COMPLIANCE ════════
export function validateCompliance(data: Record<string, unknown>): ValidationResult {
  const errors: ValidationError[] = [];

  // Verificar que no haya datos sensibles expuestos
  const sensitivePatterns = ['password', 'token', 'secret', 'api_key'];

  for (const key of Object.keys(data)) {
    if (sensitivePatterns.some(p => key.toLowerCase().includes(p))) {
      const value = data[key];
      if (typeof value === 'string' && value.length > 0) {
        errors.push({
          sphere: 7,
          field: key,
          message: `Sensitive field "${key}" should not be exposed in response`,
          code: 'SENSITIVE_DATA_EXPOSED',
        });
      }
    }
  }

  return { valid: errors.length === 0, errors, sphere: 7 };
}

// ════════ VALIDACIÓN PIPELINE ════════
export function runValidationPipeline(
  data: unknown,
  options: {
    structure?: Record<string, string>;
    email?: string;
    password?: string;
    state?: 'active' | 'inactive' | 'pending';
    method?: string;
    endpoint?: string;
  } = {},
): ValidationResult[] {
  const results: ValidationResult[] = [];

  // Esfera 1
  if (options.structure) {
    results.push(validateStructure(data, options.structure));
  }

  // Esfera 2
  if (options.email) {
    results.push(validateSemantic(options.email));
  }

  // Esfera 3
  if (options.state) {
    results.push(validateState(options.state));
  }

  // Esfera 4
  if (options.password) {
    results.push(validateSecurity(options.password));
  }

  // Esfera 5
  if (options.method && options.endpoint) {
    results.push(validateProtocol(options.method, options.endpoint));
  }

  return results;
}

export function throwOnValidationError(results: ValidationResult[]): void {
  const allErrors = results.flatMap(r => r.errors);

  if (allErrors.length > 0) {
    const error = allErrors[0];

    if (error.code === 'WEAK_PASSWORD' || error.code === 'INVALID_EMAIL') {
      throw new BadRequestException({
        message: error.message,
        sphere: error.sphere,
        code: error.code,
      });
    }

    throw new BadRequestException({
      message: 'Validation failed',
      sphere: error.sphere,
      errors: allErrors,
    });
  }
}
