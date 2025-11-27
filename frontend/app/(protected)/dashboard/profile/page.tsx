'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { User, Mail, Calendar, LogOut } from 'lucide-react';
import { format } from 'date-fns';
import { useUserStore } from '@/store/useStore';
import { useAuth } from '@/hooks/user-auth';

export default function ProfilePage() {
  const {user}=useUserStore();
  const {handleSignOut}=useAuth()
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-400rem mx-auto px-6 lg:px-12">
        <div className="mb-8">
          <h1 className="font-heading text-4xl lg:text-5xl text-primary mb-2">Profile</h1>
          <p className="font-paragraph text-base text-foreground/70">
            Manage your account information
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="font-heading text-xl text-primary">Account Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage src={user?.profile?.photo?.url} alt={user?.name || "User avatar"} onError={() => console.log("IMAGE FAILED TO LOAD:", user?.profile?.photo?.url)} />
                  <AvatarFallback className="bg-secondary text-primary font-heading text-2xl">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </AvatarFallback>
                </Avatar>
                <h2 className="font-heading text-2xl text-primary mb-1">{user?.name}</h2>
                {user?.profile?.title && (
                  <p className="font-paragraph text-sm text-foreground/70">{user.profile.title}</p>
                )}
              </div>

              <div className="space-y-4 pt-4 border-t border-primary/10">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-paragraph text-xs text-foreground/60 mb-1">Display Name</p>
                    <p className="font-paragraph text-sm text-primary">{user?.name}</p>
                  </div>
                </div>

                {user?.email && (
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-paragraph text-xs text-foreground/60 mb-1">Email</p>
                      <p className="font-paragraph text-sm text-primary">{user.email}</p>
                      {user.loginEmailVerified && (
                        <span className="inline-block mt-1 px-2 py-0.5 bg-secondary/20 text-primary rounded text-xs font-paragraph">
                          Verified
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {user?._createdDate&& (
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-paragraph text-xs text-foreground/60 mb-1">Member Since</p>
                      <p className="font-paragraph text-sm text-primary">
                        {format(new Date(user._createdDate), 'MMMM d, yyyy')}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <Button 
                variant="outline" 
                className="w-full mt-6"
                onClick={handleSignOut}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-xl text-primary">Account Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="font-paragraph text-xs text-foreground/60 mb-2">Status</p>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        user?.status === 'APPROVED' ? 'bg-green-500' : 'bg-yellow-500'
                      }`} />
                      <p className="font-paragraph text-sm text-primary capitalize">
                        {user?.status?.toLowerCase() || 'Active'}
                      </p>
                    </div>
                  </div>

                  {user?.lastLoginDate&& (
                    <div>
                      <p className="font-paragraph text-xs text-foreground/60 mb-2">Last Login</p>
                      <p className="font-paragraph text-sm text-primary">
                        {format(new Date(user.lastLoginDate), 'MMM d, yyyy h:mm a')}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-xl text-primary">Profile Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-paragraph text-sm text-foreground/70">
                  Your profile information is managed through your Wix account. To update your details, 
                  please use the Wix Members area or contact support.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
