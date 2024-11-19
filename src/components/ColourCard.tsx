interface ColourCardProps {
    hex: string; 
  }
  
  export default function ColourCard({ hex }: ColourCardProps) {
    return (
      <div
        className="colour-card"
        style={{ backgroundColor: `#${hex}` }} 
      >
        <div className="color-info text-center p-4">
          <p>Hex: #{hex}</p> 
        </div>
      </div>
    );
  }
  