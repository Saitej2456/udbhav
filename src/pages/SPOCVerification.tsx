import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Key, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import GlassCard from '@/components/GlassCard';
import PageTransition from '@/components/PageTransition';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { getIIITFromEmail } from '@/data/iiitDomainMapping';

const SPOC_CODE = 'spoc@123';

const SPOCVerification = () => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user, profile, refreshProfile } = useAuth();
  const navigate = useNavigate();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!code.trim()) {
      toast({
        title: 'Code required',
        description: 'Please enter the SPOC verification code.',
        variant: 'destructive',
      });
      return;
    }

    if (code !== SPOC_CODE) {
      toast({
        title: 'Invalid code',
        description: 'The verification code you entered is incorrect.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      // Update user role to SPOC
      const { error } = await supabase
        .from('user_profiles')
        .update({ role: 'spoc' })
        .eq('id', user?.id);

      if (error) throw error;

      await refreshProfile();

      toast({
        title: 'Verification successful!',
        description: 'You now have SPOC access.',
      });

      // Get IIIT from email domain and redirect
      const iiitId = getIIITFromEmail(profile?.email || '');
      if (iiitId) {
        navigate(`/iiits/${iiitId}`);
      } else {
        navigate('/iiits');
      }
    } catch (error: any) {
      toast({
        title: 'Verification failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
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
          <GlassCard className="space-y-6" glow="primary">
            <div className="text-center space-y-2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center mb-4"
              >
                <Shield className="w-8 h-8 text-background" />
              </motion.div>
              <h1 className="text-3xl font-bold gradient-text">
                SPOC Verification
              </h1>
              <p className="text-muted-foreground">
                Enter the verification code to access SPOC features
              </p>
            </div>

            <form onSubmit={handleVerify} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="code" className="text-foreground">
                  Verification Code
                </Label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="code"
                    type="text"
                    placeholder="Enter SPOC code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                    className="pl-10 bg-background/50 border-border/50 focus:border-primary transition-colors"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Contact the organizing team if you don't have the code
                </p>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full crt-button bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow-primary transition-all duration-300"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4 mr-2" />
                    Verify Access
                  </>
                )}
              </Button>
            </form>

            <div className="pt-4 border-t border-border/50 text-center">
              <p className="text-sm text-muted-foreground">
                SPOCs can view all team dashboards and edit their IIIT's information
              </p>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default SPOCVerification;
