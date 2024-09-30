import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function AuthenticatedCard({ title, description, children }) {
    return (
      <Card className="bg-secondary/20 sm:rounded-lg rounded-none border-x-0 sm:border-x">
          <CardHeader className="px-12 pt-12">
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent className="px-12 pb-12">{children}</CardContent>
      </Card>
    );
}
