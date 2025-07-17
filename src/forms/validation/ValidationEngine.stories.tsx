import { Box } from '@/components/layout/Box';
import { Paper } from '@/components/surfaces/Paper';
import { Typography } from '@/components/data-display/Typography';
import { Stack } from '@/components/layout/Stack';
import { Alert } from '@/components/feedback/Alert';
import { Button } from '@/components/core/Button';
import { Card, CardContent } from '@/components/data-display/Card';
import { TextField } from '@/components/forms/TextField';
import { LinearProgress } from '@/components/feedback/Progress';
import { 
  Chip,
  Divider,
  FormControlLabel,
  Switch,
} from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React, { useState, useEffect } from 'react';

import { 
  ValidationEngine, 
  commonValidationRules
} from './ValidationEngine';

/**
 * ValidationEngine is a powerful validation system with caching, async support,
 * and performance optimization features for form validation.
 * 
 * ## Key Features
 * - In-memory caching with TTL
 * - Async validation support with debouncing
 * - Batch validation for performance
 * - Conditional rule processing
 * - Common validation utilities
 * - Performance monitoring
 * - Schema validation support
 * - Dependency validation
 */
const meta: Meta<typeof ValidationEngine> = {
  title: 'Forms/ValidationEngine',
  component: ValidationEngine,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Advanced validation engine with caching and performance optimization.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// ===== VALIDATION ENGINE DEMO COMPONENT =====

const ValidationEngineDemo: React.FC<{
  title: string;
  description: string;
  children: React.ReactNode;
}> = ({ title, description, children }) => {
  const [engine] = useState(() => new ValidationEngine());
  const [validationResults, setValidationResults] = useState<any[]>([]);
  const [cacheStats, setCacheStats] = useState({ size: 0, hitRate: 0 });
  const [isValidating, setIsValidating] = useState(false);

  const updateCacheStats = () => {
    const stats = engine.getCacheStats();
    setCacheStats(stats);
  };

  useEffect(() => {
    const interval = setInterval(updateCacheStats, 1000);
    return () => clearInterval(interval);
  }, [engine]);

  const handleValidation = async (
    value: any,
    rules: any[],
    fieldName: string,
    isAsync = false
  ) => {
    setIsValidating(true);
    const startTime = Date.now();
    
    try {
      const result = isAsync 
        ? await engine.validateAsync(value, rules, fieldName)
        : await engine.validateSync(value, rules, fieldName);
      
      const duration = Date.now() - startTime;
      
      setValidationResults(prev => [...prev, {
        fieldName,
        value,
        result,
        duration,
        timestamp: new Date(),
        isAsync,
      }]);
      
      updateCacheStats();
    } catch (error) {
      console.error('Validation error:', error);
    } finally {
      setIsValidating(false);
    }
  };

  const clearResults = () => {
    setValidationResults([]);
    engine.clearCache();
    updateCacheStats();
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        {description}
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 4, mt: 3 }}>
        {/* Main Content */}
        <Box sx={{ flex: 1 }}>
          {React.cloneElement(children as React.ReactElement, {
            engine,
            onValidate: handleValidation,
            isValidating,
          })}
        </Box>
        
        {/* Sidebar */}
        <Box sx={{ width: 350 }}>
          <Stack spacing={2}>
            {/* Cache Stats */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Cache Statistics
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Cache Size
                    </Typography>
                    <Typography variant="h4">{cacheStats.size}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Hit Rate
                    </Typography>
                    <Typography variant="h4">
                      {(cacheStats.hitRate * 100).toFixed(1)}%
                    </Typography>
                  </Box>
                </Box>
                {isValidating && (
                  <Box sx={{ mt: 2 }}>
                    <LinearProgress />
                    <Typography variant="caption" color="text.secondary">
                      Validating...
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>

            {/* Validation Results */}
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">
                    Validation Results ({validationResults.length})
                  </Typography>
                  <Button onClick={clearResults} size="small" variant="outlined">
                    Clear
                  </Button>
                </Box>
                
                <Stack spacing={1} sx={{ maxHeight: 300, overflowY: 'auto' }}>
                  {validationResults.slice(-10).reverse().map((result, index) => (
                    <Box key={index} sx={{ p: 1, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="caption" fontWeight="bold">
                          {result.fieldName}
                        </Typography>
                        <Chip
                          label={result.result.isValid ? 'Valid' : 'Invalid'}
                          color={result.result.isValid ? 'success' : 'error'}
                          size="small"
                        />
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        {result.duration}ms {result.isAsync && '(async)'}
                      </Typography>
                      {result.result.message && (
                        <Typography variant="caption" color="error">
                          {result.result.message}
                        </Typography>
                      )}
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

// ===== SYNC VALIDATION STORY =====

export const SyncValidation: Story = {
  render: () => {
    const ValidationForm: React.FC<any> = ({ engine, onValidate, isValidating }) => {
      const [values, setValues] = useState({
        email: '',
        phone: '',
        url: '',
        required: '',
      });

      const handleChange = (field: string, value: string) => {
        setValues(prev => ({ ...prev, [field]: value }));
      };

      const validateField = (field: string, rules: any[]) => {
        onValidate(values[field], rules, field, false);
      };

      return (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Synchronous Validation
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Test synchronous validation with common rules
          </Typography>
          
          <Stack spacing={3} sx={{ mt: 3 }}>
            <Box>
              <TextField
                label="Email"
                value={values.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="Enter email address"
                fullWidth
              />
              <Button 
                onClick={() => validateField('email', [commonValidationRules.email()])}
                variant="outlined"
                size="small"
                sx={{ mt: 1 }}
                disabled={isValidating}
              >
                Validate Email
              </Button>
            </Box>

            <Box>
              <TextField
                label="Phone"
                value={values.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="Enter phone number"
                fullWidth
              />
              <Button 
                onClick={() => validateField('phone', [commonValidationRules.phone()])}
                variant="outlined"
                size="small"
                sx={{ mt: 1 }}
                disabled={isValidating}
              >
                Validate Phone
              </Button>
            </Box>

            <Box>
              <TextField
                label="URL"
                value={values.url}
                onChange={(e) => handleChange('url', e.target.value)}
                placeholder="Enter URL"
                fullWidth
              />
              <Button 
                onClick={() => validateField('url', [commonValidationRules.url()])}
                variant="outlined"
                size="small"
                sx={{ mt: 1 }}
                disabled={isValidating}
              >
                Validate URL
              </Button>
            </Box>

            <Box>
              <TextField
                label="Required Field"
                value={values.required}
                onChange={(e) => handleChange('required', e.target.value)}
                placeholder="This field is required"
                fullWidth
              />
              <Button 
                onClick={() => validateField('required', [commonValidationRules.required()])}
                variant="outlined"
                size="small"
                sx={{ mt: 1 }}
                disabled={isValidating}
              >
                Validate Required
              </Button>
            </Box>
          </Stack>
        </Paper>
      );
    };

    return (
      <ValidationEngineDemo
        title="Synchronous Validation"
        description="Test synchronous validation with common validation rules"
      >
        <ValidationForm />
      </ValidationEngineDemo>
    );
  },
};

// ===== ASYNC VALIDATION STORY =====

export const AsyncValidation: Story = {
  render: () => {
    const AsyncValidationForm: React.FC<any> = ({ engine, onValidate, isValidating }) => {
      const [values, setValues] = useState({
        username: '',
        email: '',
        domain: '',
      });

      const handleChange = (field: string, value: string) => {
        setValues(prev => ({ ...prev, [field]: value }));
      };

      const validateUsername = () => {
        const rule = commonValidationRules.custom(
          async (value: string) => {
            // Simulate API call to check username availability
            await new Promise(resolve => setTimeout(resolve, 1000));
            const unavailable = ['admin', 'root', 'test', 'user'];
            return !unavailable.includes(value.toLowerCase());
          },
          'Username is not available',
          true
        );
        
        onValidate(values.username, [rule], 'username', true);
      };

      const validateEmail = () => {
        const rule = commonValidationRules.custom(
          async (value: string) => {
            // Simulate API call to check email
            await new Promise(resolve => setTimeout(resolve, 800));
            const blocked = ['spam@example.com', 'blocked@test.com'];
            return !blocked.includes(value.toLowerCase());
          },
          'Email is blocked',
          true
        );
        
        onValidate(values.email, [rule], 'email', true);
      };

      const validateDomain = () => {
        const rule = commonValidationRules.custom(
          async (value: string) => {
            // Simulate domain validation
            await new Promise(resolve => setTimeout(resolve, 600));
            try {
              new URL(`https://${value}`);
              return true;
            } catch {
              return false;
            }
          },
          'Invalid domain format',
          true
        );
        
        onValidate(values.domain, [rule], 'domain', true);
      };

      return (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Asynchronous Validation
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Test asynchronous validation with API calls and debouncing
          </Typography>
          
          <Stack spacing={3} sx={{ mt: 3 }}>
            <Box>
              <TextField
                label="Username"
                value={values.username}
                onChange={(e) => handleChange('username', e.target.value)}
                placeholder="Enter username"
                fullWidth
                helperText="Try: admin, root, test, user (unavailable)"
              />
              <Button 
                onClick={validateUsername}
                variant="outlined"
                size="small"
                sx={{ mt: 1 }}
                disabled={isValidating}
              >
                Check Availability
              </Button>
            </Box>

            <Box>
              <TextField
                label="Email"
                value={values.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="Enter email address"
                fullWidth
                helperText="Try: spam@example.com, blocked@test.com (blocked)"
              />
              <Button 
                onClick={validateEmail}
                variant="outlined"
                size="small"
                sx={{ mt: 1 }}
                disabled={isValidating}
              >
                Check Email
              </Button>
            </Box>

            <Box>
              <TextField
                label="Domain"
                value={values.domain}
                onChange={(e) => handleChange('domain', e.target.value)}
                placeholder="Enter domain (e.g., example.com)"
                fullWidth
              />
              <Button 
                onClick={validateDomain}
                variant="outlined"
                size="small"
                sx={{ mt: 1 }}
                disabled={isValidating}
              >
                Validate Domain
              </Button>
            </Box>
          </Stack>
        </Paper>
      );
    };

    return (
      <ValidationEngineDemo
        title="Asynchronous Validation"
        description="Test asynchronous validation with simulated API calls"
      >
        <AsyncValidationForm />
      </ValidationEngineDemo>
    );
  },
};

// ===== BATCH VALIDATION STORY =====

export const BatchValidation: Story = {
  render: () => {
    const BatchValidationForm: React.FC<any> = ({ engine, onValidate, isValidating }) => {
      const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        website: '',
      });

      const [batchResult, setBatchResult] = useState<any>(null);

      const handleChange = (field: string, value: string) => {
        setValues(prev => ({ ...prev, [field]: value }));
      };

      const validateAll = async () => {
        const rules = {
          firstName: [commonValidationRules.required('First name is required')],
          lastName: [commonValidationRules.required('Last name is required')],
          email: [
            commonValidationRules.required('Email is required'),
            commonValidationRules.email('Invalid email format'),
          ],
          phone: [commonValidationRules.phone('Invalid phone format')],
          website: [commonValidationRules.url('Invalid URL format')],
        };

        const startTime = Date.now();
        const results = await engine.validateBatch(values, rules);
        const duration = Date.now() - startTime;

        setBatchResult({ results, duration });
      };

      return (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Batch Validation
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Validate multiple fields simultaneously for better performance
          </Typography>
          
          <Stack spacing={3} sx={{ mt: 3 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="First Name"
                value={values.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                placeholder="Enter first name"
                fullWidth
              />
              <TextField
                label="Last Name"
                value={values.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                placeholder="Enter last name"
                fullWidth
              />
            </Box>

            <TextField
              label="Email"
              value={values.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="Enter email address"
              fullWidth
            />

            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Phone"
                value={values.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="Enter phone number"
                fullWidth
              />
              <TextField
                label="Website"
                value={values.website}
                onChange={(e) => handleChange('website', e.target.value)}
                placeholder="Enter website URL"
                fullWidth
              />
            </Box>

            <Button 
              onClick={validateAll}
              variant="contained"
              disabled={isValidating}
              fullWidth
            >
              Validate All Fields
            </Button>

            {batchResult && (
              <Alert severity="info">
                <Typography variant="subtitle2">
                  Batch Validation Result (completed in {batchResult.duration}ms)
                </Typography>
                <Stack spacing={1} sx={{ mt: 1 }}>
                  {Object.entries(batchResult.results).map(([field, result]: [string, any]) => (
                    <Box key={field} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip
                        label={field}
                        size="small"
                        variant="outlined"
                      />
                      <Chip
                        label={result.isValid ? 'Valid' : 'Invalid'}
                        color={result.isValid ? 'success' : 'error'}
                        size="small"
                      />
                      {result.message && (
                        <Typography variant="caption" color="error">
                          {result.message}
                        </Typography>
                      )}
                    </Box>
                  ))}
                </Stack>
              </Alert>
            )}
          </Stack>
        </Paper>
      );
    };

    return (
      <ValidationEngineDemo
        title="Batch Validation"
        description="Validate multiple fields simultaneously for better performance"
      >
        <BatchValidationForm />
      </ValidationEngineDemo>
    );
  },
};

// ===== CACHE PERFORMANCE STORY =====

export const CachePerformance: Story = {
  render: () => {
    const CachePerformanceForm: React.FC<any> = ({ engine, onValidate, isValidating }) => {
      const [value, setValue] = useState('');
      const [enableCache, setEnableCache] = useState(true);

      const testValidation = async () => {
        const rules = [
          commonValidationRules.required('Field is required'),
          commonValidationRules.email('Invalid email format'),
          commonValidationRules.custom(
            async (val: string) => {
              // Simulate expensive validation
              await new Promise(resolve => setTimeout(resolve, 200));
              return val.length >= 5;
            },
            'Must be at least 5 characters',
            true
          ),
        ];

        if (!enableCache) {
          engine.clearCache();
        }

        // Run validation multiple times to show caching effect
        for (let i = 0; i < 5; i++) {
          await onValidate(value, rules, `test-${i}`, true);
        }
      };

      const warmCache = async () => {
        const commonValues = [
          'test@example.com',
          'admin@test.com',
          'user@domain.com',
          'hello@world.com',
          'cache@test.com',
        ];

        const rules = [
          commonValidationRules.required('Field is required'),
          commonValidationRules.email('Invalid email format'),
        ];

        await engine.warmCache(
          commonValues.reduce((acc, val, i) => {
            acc[`field-${i}`] = val;
            return acc;
          }, {} as any),
          commonValues.reduce((acc, val, i) => {
            acc[`field-${i}`] = rules;
            return acc;
          }, {} as any)
        );
      };

      return (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Cache Performance
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Test validation caching and performance optimization
          </Typography>
          
          <Stack spacing={3} sx={{ mt: 3 }}>
            <TextField
              label="Test Value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter test value"
              fullWidth
              helperText="Try email formats to see caching in action"
            />

            <FormControlLabel
              control={
                <Switch
                  checked={enableCache}
                  onChange={(e) => setEnableCache(e.target.checked)}
                />
              }
              label="Enable Caching"
            />

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button 
                onClick={testValidation}
                variant="contained"
                disabled={isValidating}
              >
                Test Validation (5x)
              </Button>
              
              <Button 
                onClick={warmCache}
                variant="outlined"
                disabled={isValidating}
              >
                Warm Cache
              </Button>
              
              <Button 
                onClick={() => engine.clearCache()}
                variant="outlined"
                color="secondary"
              >
                Clear Cache
              </Button>
            </Box>

            <Alert severity="info">
              <Typography variant="subtitle2">Performance Tips:</Typography>
              <ul>
                <li>First validation will be slower (cache miss)</li>
                <li>Subsequent validations will be faster (cache hit)</li>
                <li>Cache warming can improve initial performance</li>
                <li>Watch the hit rate increase with repeated validations</li>
              </ul>
            </Alert>
          </Stack>
        </Paper>
      );
    };

    return (
      <ValidationEngineDemo
        title="Cache Performance"
        description="Test validation caching and performance optimization"
      >
        <CachePerformanceForm />
      </ValidationEngineDemo>
    );
  },
};

// ===== CUSTOM VALIDATION STORY =====

export const CustomValidation: Story = {
  render: () => {
    const CustomValidationForm: React.FC<any> = ({ engine, onValidate, isValidating }) => {
      const [values, setValues] = useState({
        password: '',
        confirmPassword: '',
        creditCard: '',
        ssn: '',
      });

      const handleChange = (field: string, value: string) => {
        setValues(prev => ({ ...prev, [field]: value }));
      };

      const validatePassword = () => {
        const rules = [
          commonValidationRules.required('Password is required'),
          commonValidationRules.custom(
            (value: string) => value.length >= 8,
            'Password must be at least 8 characters'
          ),
          commonValidationRules.custom(
            (value: string) => /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value),
            'Password must contain uppercase, lowercase, and number'
          ),
          commonValidationRules.custom(
            (value: string) => /(?=.*[!@#$%^&*])/.test(value),
            'Password must contain special character'
          ),
        ];
        
        onValidate(values.password, rules, 'password', false);
      };

      const validateCreditCard = () => {
        const rules = [
          commonValidationRules.custom(
            (value: string) => {
              // Luhn algorithm for credit card validation
              const digits = value.replace(/\D/g, '');
              if (digits.length < 13 || digits.length > 19) return false;
              
              let sum = 0;
              let isEven = false;
              
              for (let i = digits.length - 1; i >= 0; i--) {
                let digit = parseInt(digits[i]);
                
                if (isEven) {
                  digit *= 2;
                  if (digit > 9) digit -= 9;
                }
                
                sum += digit;
                isEven = !isEven;
              }
              
              return sum % 10 === 0;
            },
            'Invalid credit card number'
          ),
        ];
        
        onValidate(values.creditCard, rules, 'creditCard', false);
      };

      const validateSSN = () => {
        const rules = [
          commonValidationRules.custom(
            (value: string) => {
              const ssnPattern = /^\d{3}-\d{2}-\d{4}$/;
              return ssnPattern.test(value);
            },
            'SSN must be in format: XXX-XX-XXXX'
          ),
        ];
        
        onValidate(values.ssn, rules, 'ssn', false);
      };

      return (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Custom Validation Rules
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Test custom validation logic for complex requirements
          </Typography>
          
          <Stack spacing={3} sx={{ mt: 3 }}>
            <Box>
              <TextField
                label="Password"
                type="password"
                value={values.password}
                onChange={(e) => handleChange('password', e.target.value)}
                placeholder="Enter secure password"
                fullWidth
                helperText="Must be 8+ chars with uppercase, lowercase, number, and special character"
              />
              <Button 
                onClick={validatePassword}
                variant="outlined"
                size="small"
                sx={{ mt: 1 }}
                disabled={isValidating}
              >
                Validate Password
              </Button>
            </Box>

            <Box>
              <TextField
                label="Credit Card"
                value={values.creditCard}
                onChange={(e) => handleChange('creditCard', e.target.value)}
                placeholder="Enter credit card number"
                fullWidth
                helperText="Try: 4532015112830366 (valid test number)"
              />
              <Button 
                onClick={validateCreditCard}
                variant="outlined"
                size="small"
                sx={{ mt: 1 }}
                disabled={isValidating}
              >
                Validate Credit Card
              </Button>
            </Box>

            <Box>
              <TextField
                label="SSN"
                value={values.ssn}
                onChange={(e) => handleChange('ssn', e.target.value)}
                placeholder="Enter SSN"
                fullWidth
                helperText="Format: XXX-XX-XXXX"
              />
              <Button 
                onClick={validateSSN}
                variant="outlined"
                size="small"
                sx={{ mt: 1 }}
                disabled={isValidating}
              >
                Validate SSN
              </Button>
            </Box>
          </Stack>
        </Paper>
      );
    };

    return (
      <ValidationEngineDemo
        title="Custom Validation Rules"
        description="Test custom validation logic for complex requirements"
      >
        <CustomValidationForm />
      </ValidationEngineDemo>
    );
  },
};