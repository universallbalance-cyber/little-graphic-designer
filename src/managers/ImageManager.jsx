class ImageManager {
  constructor() {
    this.currentImage = null;
    this.imageData = null;
  }

  loadImage(pageData, canvas, ctx) {
    const img = new Image();
    
    img.onload = () => {
      this.currentImage = img;
      
      const scale = Math.min(
        canvas.width / img.width,
        canvas.height / img.height
      );
      
      const x = (canvas.width - img.width * scale) / 2;
      const y = (canvas.height - img.height * scale) / 2;
      
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.drawImage(
        img,
        x, y,
        img.width * scale,
        img.height * scale
      );
      
      this.imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    };
    
    img.src = this.generatePlaceholderSVG(pageData);
  }

  generatePlaceholderSVG(pageData) {
    const svgs = {
      1: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
        <circle cx="200" cy="150" r="80" fill="none" stroke="black" stroke-width="3"/>
        <circle cx="180" cy="140" r="10" fill="black"/>
        <circle cx="220" cy="140" r="10" fill="black"/>
        <path d="M 170 170 Q 200 190 230 170" fill="none" stroke="black" stroke-width="3"/>
        <rect x="150" y="230" width="100" height="120" rx="20" fill="none" stroke="black" stroke-width="3"/>
        <circle cx="200" cy="280" r="15" fill="none" stroke="black" stroke-width="3"/>
      </svg>`,
      2: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
        <circle cx="200" cy="150" r="70" fill="none" stroke="black" stroke-width="3"/>
        <circle cx="180" cy="140" r="8" fill="black"/>
        <circle cx="220" cy="140" r="8" fill="black"/>
        <path d="M 180 170 Q 200 180 220 170" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 130 120 Q 120 80 140 70" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 270 120 Q 280 80 260 70" fill="none" stroke="black" stroke-width="3"/>
        <rect x="160" y="220" width="80" height="100" fill="none" stroke="black" stroke-width="3"/>
      </svg>`,
      3: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
        <ellipse cx="200" cy="200" rx="80" ry="100" fill="none" stroke="black" stroke-width="3"/>
        <circle cx="180" cy="180" r="10" fill="black"/>
        <circle cx="220" cy="180" r="10" fill="black"/>
        <path d="M 180 220 Q 200 230 220 220" fill="none" stroke="black" stroke-width="3"/>
        <ellipse cx="280" cy="200" rx="30" ry="50" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 280 150 L 290 140 M 280 200 L 295 200 M 280 250 L 290 260" stroke="black" stroke-width="3"/>
      </svg>`,
      4: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
        <circle cx="200" cy="150" r="60" fill="none" stroke="black" stroke-width="3"/>
        <circle cx="185" cy="140" r="8" fill="black"/>
        <circle cx="215" cy="140" r="8" fill="black"/>
        <path d="M 185 165 Q 200 175 215 165" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 140 180 Q 120 200 130 220" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 260 180 Q 280 200 270 220" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 160 240 Q 150 270 160 290" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 240 240 Q 250 270 240 290" fill="none" stroke="black" stroke-width="3"/>
      </svg>`,
      5: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
        <ellipse cx="200" cy="200" rx="90" ry="110" fill="none" stroke="black" stroke-width="3"/>
        <circle cx="180" cy="180" r="12" fill="black"/>
        <circle cx="220" cy="180" r="12" fill="black"/>
        <path d="M 170 220 Q 200 240 230 220" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 110 160 Q 90 140 100 120" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 290 160 Q 310 140 300 120" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 140 310 Q 130 340 145 350" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 260 310 Q 270 340 255 350" fill="none" stroke="black" stroke-width="3"/>
      </svg>`
    };

    const svg = svgs[pageData.id] || svgs[1];
    return 'data:image/svg+xml;base64,' + btoa(svg);
  }

  getImageData() {
    return this.imageData;
  }
}

export default ImageManager;