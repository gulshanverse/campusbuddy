import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useAppStore } from '../../store/appStore';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { useToast } from '../../components/shared/Toast';
import { Sparkles, MessageSquare, User } from 'lucide-react';
import { getAIRecommendations } from './matchingEngine';

export const RecommendationsWidget: React.FC = () => {
  const navigate = useNavigate();
  const { profile: currentProfile } = useAuthStore();
  const { profiles, startConversation } = useAppStore();
  const toast = useToast();

  if (!currentProfile) return null;

  const recommendations = getAIRecommendations(currentProfile, profiles, 3);

  const handleMessage = (targetUserId: string, targetName: string) => {
    const convId = startConversation([currentProfile.userId, targetUserId], 'direct');
    toast.success('Chat Channel Created', `You can now chat with ${targetName}.`);
    navigate('/chat', { state: { activeConvId: convId } });
  };

  return (
    <Card padding="md">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <Sparkles size={18} style={{ color: 'var(--accent-purple)' }} />
        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', fontFamily: 'var(--font-display)' }}>
          AI Match Suggestions
        </h3>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {recommendations.map((rec) => (
          <div
            key={rec.profile.userId}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              paddingBottom: '14px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.03)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Avatar src={rec.profile.avatar} name={rec.profile.name} size="sm" isVerified={true} />
              <div style={{ flexGrow: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontWeight: '700', fontSize: '0.9rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {rec.profile.name}
                  </span>
                  <Badge variant="verified" style={{ fontSize: '0.65rem', padding: '0px 4px' }}>
                    {rec.score}% Match
                  </Badge>
                </div>
                <span style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  {rec.profile.branch} • Year {rec.profile.year}
                </span>
              </div>
            </div>
            {rec.reasons.length > 0 && (
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', background: 'rgba(255, 255, 255, 0.01)', padding: '6px 10px', borderRadius: '4px' }}>
                💡 {rec.reasons[0]}
              </div>
            )}
            <div style={{ display: 'flex', gap: '8px', marginTop: '2px' }}>
              <Button
                variant="outline"
                size="sm"
                style={{ flex: 1, padding: '4px 10px', fontSize: '0.8rem' }}
                onClick={() => handleMessage(rec.profile.userId, rec.profile.name)}
                leftIcon={<MessageSquare size={12} />}
              >
                Message
              </Button>
              <Button
                variant="secondary"
                size="sm"
                style={{ flex: 1, padding: '4px 10px', fontSize: '0.8rem' }}
                onClick={() => navigate(`/profile/${rec.profile.userId}`)}
                leftIcon={<User size={12} />}
              >
                View Profile
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
