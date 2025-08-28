import { Star, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Reputation } from '../types';

interface ReputationCardProps {
  reputation: Reputation;
  showReviews?: boolean;
}

export function ReputationCard({ reputation, showReviews = false }: ReputationCardProps) {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400 opacity-50" />);
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <Card className="rounded-2xl">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-1">
            {renderStars(reputation.averageRating)}
          </div>
          <span className="font-medium">{reputation.averageRating.toFixed(1)}</span>
          <span className="text-muted-foreground">({reputation.totalReviews} avaliações)</span>
        </div>
        
        <div className="flex gap-4 mb-3">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm">{reputation.totalServices} serviços</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <span className="text-sm">{reputation.punctualityRate}% pontualidade</span>
          </div>
        </div>

        {showReviews && reputation.recentReviews.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium">Avaliações recentes:</h4>
            {reputation.recentReviews.slice(0, 2).map((review) => (
              <div key={review.id} className="bg-muted/50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex">
                    {renderStars(review.rating)}
                  </div>
                  <span className="text-sm text-muted-foreground">{review.reviewerName}</span>
                </div>
                <p className="text-sm">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}