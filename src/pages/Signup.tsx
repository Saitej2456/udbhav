import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Lock, Loader2, User, Shield, Users } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import GlassCard from '@/components/GlassCard';
import PageTransition from '@/components/PageTransition';
import { useToast } from '@/hooks/use-toast';

type UserRole = 'admin' | 'spoc' | 'team_leader';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState<UserRole>('team_leader');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const { signUp, signInWithGoogle } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast({
                title: 'Passwords do not match',
                description: 'Please make sure your passwords match.',
                variant: 'destructive',
            });
            return;
        }

        if (password.length < 6) {
            toast({
                title: 'Password too short',
                description: 'Password must be at least 6 characters long.',
                variant: 'destructive',
            });
            return;
        }

        if (!name.trim()) {
            toast({
                title: 'Name required',
                description: 'Please enter your full name.',
                variant: 'destructive',
            });
            return;
        }

        setLoading(true);

        const { error } = await signUp(email, password, { role, name });

        if (error) {
            toast({
                title: 'Signup Failed',
                description: error.message,
                variant: 'destructive',
            });
            setLoading(false);
        } else {
            toast({
                title: 'Account Created!',
                description: 'Please check your email to verify your account.',
            });
            navigate('/login');
        }
    };

    const handleGoogleSignIn = async () => {
        setGoogleLoading(true);
        const { error } = await signInWithGoogle();

        if (error) {
            toast({
                title: 'Google Sign-In Failed',
                description: error.message,
                variant: 'destructive',
            });
            setGoogleLoading(false);
        }
        // Note: Page will redirect to Google, so no need to handle success here
    };

    return (
        <PageTransition>
            <div className="min-h-screen flex items-center justify-center px-4 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md"
                >
                    <GlassCard className="space-y-6" glow="secondary" variant="premium">
                        <div className="text-center space-y-2">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                                className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-secondary-glow flex items-center justify-center mb-4"
                            >
                                <UserPlus className="w-8 h-8 text-background" />
                            </motion.div>
                            <h1 className="text-3xl font-bold gradient-text-secondary">
                                Create Account
                            </h1>
                            <p className="text-muted-foreground">
                                Join UDBHAV and start your journey
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-foreground">
                                    Full Name
                                </Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="John Doe"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className="pl-10 bg-background/50 border-border/50 focus:border-secondary transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Label className="text-foreground">Account Role</Label>
                                <RadioGroup value={role} onValueChange={(value) => setRole(value as UserRole)}>
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-3 p-3 rounded-lg border border-border/50 hover:border-primary/50 transition-colors cursor-pointer">
                                            <RadioGroupItem value="team_leader" id="team_leader" />
                                            <Label htmlFor="team_leader" className="flex items-center gap-2 cursor-pointer flex-1">
                                                <Users className="w-4 h-4 text-primary" />
                                                <div>
                                                    <div className="font-medium">Team Leader</div>
                                                    <div className="text-xs text-muted-foreground">Lead a team and manage members</div>
                                                </div>
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-3 p-3 rounded-lg border border-border/50 hover:border-secondary/50 transition-colors cursor-pointer">
                                            <RadioGroupItem value="spoc" id="spoc" />
                                            <Label htmlFor="spoc" className="flex items-center gap-2 cursor-pointer flex-1">
                                                <Shield className="w-4 h-4 text-secondary" />
                                                <div>
                                                    <div className="font-medium">SPOC</div>
                                                    <div className="text-xs text-muted-foreground">Single Point of Contact for IIIT</div>
                                                </div>
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-3 p-3 rounded-lg border border-border/50 hover:border-accent/50 transition-colors cursor-pointer">
                                            <RadioGroupItem value="admin" id="admin" />
                                            <Label htmlFor="admin" className="flex items-center gap-2 cursor-pointer flex-1">
                                                <Shield className="w-4 h-4 text-accent" />
                                                <div>
                                                    <div className="font-medium">Admin</div>
                                                    <div className="text-xs text-muted-foreground">Full access to all features</div>
                                                </div>
                                            </Label>
                                        </div>
                                    </div>
                                </RadioGroup>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-foreground">
                                    Email
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="pl-10 bg-background/50 border-border/50 focus:border-secondary transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-foreground">
                                    Password
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="pl-10 bg-background/50 border-border/50 focus:border-secondary transition-colors"
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Must be at least 6 characters
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword" className="text-foreground">
                                    Confirm Password
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="••••••••"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        className="pl-10 bg-background/50 border-border/50 focus:border-secondary transition-colors"
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full crt-button bg-gradient-to-r from-secondary to-secondary-glow hover:shadow-glow-secondary transition-all duration-300"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Creating account...
                                    </>
                                ) : (
                                    <>
                                        <UserPlus className="w-4 h-4 mr-2" />
                                        Sign Up
                                    </>
                                )}
                            </Button>
                        </form>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-border/50" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card px-2 text-muted-foreground">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <Button
                            type="button"
                            onClick={handleGoogleSignIn}
                            disabled={googleLoading || loading}
                            variant="outline"
                            className="w-full crt-button border-border/50 hover:bg-card-hover hover:border-secondary/50 transition-all duration-300"
                        >
                            {googleLoading ? (
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            ) : (
                                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                    <path
                                        fill="#4285F4"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="#34A853"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="#FBBC05"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    />
                                    <path
                                        fill="#EA4335"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                </svg>
                            )}
                            Continue with Google
                        </Button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-border/50" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card px-2 text-muted-foreground">
                                    Already have an account?
                                </span>
                            </div>
                        </div>

                        <div className="text-center">
                            <p className="text-sm text-muted-foreground">
                                Already registered?{' '}
                                <Link
                                    to="/login"
                                    className="text-secondary hover:text-secondary-glow transition-colors font-medium"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </GlassCard>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-center text-xs text-muted-foreground mt-6"
                    >
                        By signing up, you agree to our Terms of Service and Privacy Policy
                    </motion.p>
                </motion.div>
            </div>
        </PageTransition>
    );
};

export default Signup;
