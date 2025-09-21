import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, UserPlus, LogIn, Mail, Lock, User, Phone } from "lucide-react";

interface FormData {
  email: string;
  password: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  username?: string;
}

interface ValidationErrors {
  [key: string]: string;
}

const UserAuth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginData, setLoginData] = useState<FormData>({ email: "", password: "" });
  const [registerData, setRegisterData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    username: ""
  });
  const [loginErrors, setLoginErrors] = useState<ValidationErrors>({});
  const [registerErrors, setRegisterErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Regex patterns for validation
  const patterns = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    phone: /^[\+]?[\d\s\-\(\)]{10,}$/,
    username: /^[a-zA-Z0-9_]{3,20}$/,
    name: /^[a-zA-Z\s]{2,30}$/
  };

  const validateField = (field: string, value: string, isRegister = false): string => {
    switch (field) {
      case 'email':
        if (!value) return 'Email is required';
        if (!patterns.email.test(value)) return 'Please enter a valid email address';
        break;
      case 'password':
        if (!value) return 'Password is required';
        if (isRegister && !patterns.password.test(value)) {
          return 'Password must be at least 8 characters with uppercase, lowercase, number, and special character';
        }
        break;
      case 'confirmPassword':
        if (isRegister) {
          if (!value) return 'Please confirm your password';
          if (value !== registerData.password) return 'Passwords do not match';
        }
        break;
      case 'firstName':
      case 'lastName':
        if (isRegister) {
          if (!value) return `${field === 'firstName' ? 'First' : 'Last'} name is required`;
          if (!patterns.name.test(value)) return 'Name must contain only letters and spaces (2-30 characters)';
        }
        break;
      case 'username':
        if (isRegister) {
          if (!value) return 'Username is required';
          if (!patterns.username.test(value)) return 'Username must be 3-20 characters (letters, numbers, underscore only)';
        }
        break;
      case 'phone':
        if (isRegister && value) {
          if (!patterns.phone.test(value)) return 'Please enter a valid phone number';
        }
        break;
    }
    return '';
  };

  const validateForm = (data: FormData, isRegister = false): ValidationErrors => {
    const errors: ValidationErrors = {};
    
    Object.keys(data).forEach(field => {
      const error = validateField(field, data[field as keyof FormData] || '', isRegister);
      if (error) errors[field] = error;
    });

    return errors;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm(loginData, false);
    setLoginErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        toast({
          title: "Login Successful",
          description: "Welcome back! You have been logged in successfully.",
        });
        setIsLoading(false);
        setLoginData({ email: "", password: "" });
      }, 1500);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm(registerData, true);
    setRegisterErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        toast({
          title: "Registration Successful",
          description: "Your account has been created successfully!",
        });
        setIsLoading(false);
        setRegisterData({
          email: "",
          password: "",
          confirmPassword: "",
          firstName: "",
          lastName: "",
          phone: "",
          username: ""
        });
      }, 2000);
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 text-foreground">Join Our Community</h2>
          <p className="text-muted-foreground">
            Stay connected and share your experiences with COVID-19 safety measures.
          </p>
        </div>

        <Card className="p-6 shadow-lg">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login" className="flex items-center gap-2">
                <LogIn className="w-4 h-4" />
                Login
              </TabsTrigger>
              <TabsTrigger value="register" className="flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                Register
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4 mt-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="login-email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="your@email.com"
                      className={`pl-10 ${loginErrors.email ? 'border-destructive' : ''}`}
                      value={loginData.email}
                      onChange={(e) => {
                        setLoginData(prev => ({ ...prev, email: e.target.value }));
                        if (loginErrors.email) {
                          setLoginErrors(prev => ({ ...prev, email: '' }));
                        }
                      }}
                    />
                  </div>
                  {loginErrors.email && (
                    <p className="text-sm text-destructive mt-1">{loginErrors.email}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className={`pl-10 pr-10 ${loginErrors.password ? 'border-destructive' : ''}`}
                      value={loginData.password}
                      onChange={(e) => {
                        setLoginData(prev => ({ ...prev, password: e.target.value }));
                        if (loginErrors.password) {
                          setLoginErrors(prev => ({ ...prev, password: '' }));
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {loginErrors.password && (
                    <p className="text-sm text-destructive mt-1">{loginErrors.password}</p>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register" className="space-y-4 mt-6">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="firstName"
                        placeholder="John"
                        className={`pl-10 ${registerErrors.firstName ? 'border-destructive' : ''}`}
                        value={registerData.firstName}
                        onChange={(e) => {
                          setRegisterData(prev => ({ ...prev, firstName: e.target.value }));
                          if (registerErrors.firstName) {
                            setRegisterErrors(prev => ({ ...prev, firstName: '' }));
                          }
                        }}
                      />
                    </div>
                    {registerErrors.firstName && (
                      <p className="text-sm text-destructive mt-1">{registerErrors.firstName}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      className={`${registerErrors.lastName ? 'border-destructive' : ''}`}
                      value={registerData.lastName}
                      onChange={(e) => {
                        setRegisterData(prev => ({ ...prev, lastName: e.target.value }));
                        if (registerErrors.lastName) {
                          setRegisterErrors(prev => ({ ...prev, lastName: '' }));
                        }
                      }}
                    />
                    {registerErrors.lastName && (
                      <p className="text-sm text-destructive mt-1">{registerErrors.lastName}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="johndoe123"
                    className={`${registerErrors.username ? 'border-destructive' : ''}`}
                    value={registerData.username}
                    onChange={(e) => {
                      setRegisterData(prev => ({ ...prev, username: e.target.value }));
                      if (registerErrors.username) {
                        setRegisterErrors(prev => ({ ...prev, username: '' }));
                      }
                    }}
                  />
                  {registerErrors.username && (
                    <p className="text-sm text-destructive mt-1">{registerErrors.username}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="register-email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="your@email.com"
                      className={`pl-10 ${registerErrors.email ? 'border-destructive' : ''}`}
                      value={registerData.email}
                      onChange={(e) => {
                        setRegisterData(prev => ({ ...prev, email: e.target.value }));
                        if (registerErrors.email) {
                          setRegisterErrors(prev => ({ ...prev, email: '' }));
                        }
                      }}
                    />
                  </div>
                  {registerErrors.email && (
                    <p className="text-sm text-destructive mt-1">{registerErrors.email}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number (Optional)</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      className={`pl-10 ${registerErrors.phone ? 'border-destructive' : ''}`}
                      value={registerData.phone}
                      onChange={(e) => {
                        setRegisterData(prev => ({ ...prev, phone: e.target.value }));
                        if (registerErrors.phone) {
                          setRegisterErrors(prev => ({ ...prev, phone: '' }));
                        }
                      }}
                    />
                  </div>
                  {registerErrors.phone && (
                    <p className="text-sm text-destructive mt-1">{registerErrors.phone}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="register-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      className={`pl-10 pr-10 ${registerErrors.password ? 'border-destructive' : ''}`}
                      value={registerData.password}
                      onChange={(e) => {
                        setRegisterData(prev => ({ ...prev, password: e.target.value }));
                        if (registerErrors.password) {
                          setRegisterErrors(prev => ({ ...prev, password: '' }));
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {registerErrors.password && (
                    <p className="text-sm text-destructive mt-1">{registerErrors.password}</p>
                  )}
                  <div className="mt-2">
                    <Badge variant="outline" className="text-xs">
                      Must include: 8+ chars, uppercase, lowercase, number, special char
                    </Badge>
                  </div>
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      className={`pl-10 pr-10 ${registerErrors.confirmPassword ? 'border-destructive' : ''}`}
                      value={registerData.confirmPassword}
                      onChange={(e) => {
                        setRegisterData(prev => ({ ...prev, confirmPassword: e.target.value }));
                        if (registerErrors.confirmPassword) {
                          setRegisterErrors(prev => ({ ...prev, confirmPassword: '' }));
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {registerErrors.confirmPassword && (
                    <p className="text-sm text-destructive mt-1">{registerErrors.confirmPassword}</p>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </section>
  );
};

export default UserAuth;