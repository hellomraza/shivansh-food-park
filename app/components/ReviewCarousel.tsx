import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import type { Review } from "@/lib/types";
import Autoplay from "embla-carousel-autoplay";
import { Star } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';

interface ReviewCarouselProps {
  reviews: Review[];
}

// Function to generate a consistent color based on user name
function getAvatarColor(name: string): string {
  const colors = [
    'bg-blue-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-orange-500',
    'bg-green-500',
    'bg-red-500',
    'bg-indigo-500',
    'bg-cyan-500',
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
}

export function ReviewCarousel({ reviews }: ReviewCarouselProps) {
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-5xl mx-auto"
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent className="-ml-4">
        {reviews.map((review, index) => (
          <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
            <div className="p-1 h-full">
              <Card className="bg-card border-border/50 h-full hover:border-primary/50 transition-colors duration-300">
                <CardContent className="flex flex-col p-6 h-full justify-between">
                  <div>
                    <div className="flex mb-4 gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? "fill-primary text-primary" : "text-muted-foreground/30"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground italic text-sm mb-6 line-clamp-4">
                      &quot;{review.text}&quot;
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3 mt-auto">
                    {review.profile_photo_url ? (
                      <Image 
                        src={review.profile_photo_url} 
                        alt={review.author_name}
                        width={40}
                        height={40}
                        className="rounded-full border border-primary/20 object-cover"
                      />
                    ) : (
                      <div className={`w-10 h-10 rounded-full ${getAvatarColor(review.author_name)} flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                        {review.author_name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-sm text-foreground">{review.author_name}</p>
                      <p className="text-xs text-muted-foreground">{review.relative_time_description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex justify-center gap-2 mt-8 md:hidden">
        {/* Mobile controls usually redundant with swipe, but good for accessibility */}
      </div>
      <CarouselPrevious className="hidden md:flex border-primary/20 text-primary hover:bg-primary hover:text-black" />
      <CarouselNext className="hidden md:flex border-primary/20 text-primary hover:bg-primary hover:text-black" />
    </Carousel>
  );
}
