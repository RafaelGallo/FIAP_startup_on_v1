import { ArrowLeft, Menu } from 'lucide-react';
import { Button } from './ui/button';

interface HeaderProps {
  title: string;
  onBack?: () => void;
  showMenu?: boolean;
  rightAction?: React.ReactNode;
}

export function Header({ title, onBack, showMenu = false, rightAction }: HeaderProps) {
  return (
    <header className="flex items-center justify-between p-4 bg-background border-b">
      <div className="flex items-center gap-3">
        {onBack && (
          <Button variant="ghost" size="icon" onClick={onBack} className="h-9 w-9">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        <h1 className="font-medium">{title}</h1>
      </div>
      
      <div className="flex items-center gap-2">
        {rightAction}
        {showMenu && (
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Menu className="h-5 w-5" />
          </Button>
        )}
      </div>
    </header>
  );
}