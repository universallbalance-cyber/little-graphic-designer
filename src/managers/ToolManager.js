class ToolManager {
  constructor() {
    this.currentTool = null;
    this.isDrawing = false;
    this.lastPoint = null;
  }

  startTool({ tool, point, color, canvas, ctx, brushSize }) {
    this.currentTool = tool;
    this.isDrawing = true;
    this.lastPoint = point;

    switch (tool) {
      case 'brush':
        this.drawBrush(point, color, ctx, brushSize);
        break;
      case 'bucket':
        this.floodFill(point, color, canvas, ctx);
        this.isDrawing = false; // Fill is a single action
        break;
      case 'eraser':
        this.erase(point, ctx, brushSize);
        break;
      case 'text':
      case 'move-text':
        // This is now handled in ColoringCanvas.jsx directly
        this.isDrawing = false;
        break;
      default:
        this.isDrawing = false;
        break;
    }
  }

  moveTool({ point, canvas, ctx, brushSize, color }) {
    if (!this.isDrawing) return;

    switch (this.currentTool) {
      case 'brush':
        this.drawBrush(point, color, ctx, brushSize);
        break;
      case 'eraser':
        this.erase(point, ctx, brushSize);
        break;
      default:
        break;
    }

    this.lastPoint = point;
  }

  endTool() {
    this.isDrawing = false;
    this.lastPoint = null;
  }

  drawBrush(point, color, ctx, brushSize) {
    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    if (this.lastPoint) {
      ctx.moveTo(this.lastPoint.x, this.lastPoint.y);
    } else {
      ctx.moveTo(point.x - 0.01, point.y); // Start a tiny bit away for a dot
    }
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
  }
  
  drawText(textInfo, ctx) {
      if (!textInfo || !textInfo.content) return;
      ctx.font = textInfo.font;
      ctx.fillStyle = textInfo.color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(textInfo.content, textInfo.x, textInfo.y);
  }

  erase(point, ctx, brushSize) {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.strokeStyle = 'rgba(0,0,0,1)';
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    if (this.lastPoint) {
      ctx.moveTo(this.lastPoint.x, this.lastPoint.y);
    } else {
      ctx.moveTo(point.x - 0.01, point.y);
    }
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
    
    ctx.globalCompositeOperation = 'source-over';
  }

  floodFill(point, fillColor, canvas, ctx) {
    ctx.globalCompositeOperation = 'source-over';
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    const startX = Math.floor(point.x);
    const startY = Math.floor(point.y);
    
    if (startX < 0 || startX >= canvas.width || startY < 0 || startY >= canvas.height) {
      return;
    }

    const startPos = (startY * canvas.width + startX) * 4;
    const startR = pixels[startPos];
    const startG = pixels[startPos + 1];
    const startB = pixels[startPos + 2];
    const startA = pixels[startPos + 3];

    const fillR = parseInt(fillColor.slice(1, 3), 16);
    const fillG = parseInt(fillColor.slice(3, 5), 16);
    const fillB = parseInt(fillColor.slice(5, 7), 16);

    // If the starting color is the same as the fill color, do nothing
    if (startR === fillR && startG === fillG && startB === fillB && startA === 255) {
      return;
    }

    const stack = [[startX, startY]];
    
    while (stack.length > 0) {
      const [x, y] = stack.pop();

      if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) continue;
      
      const pos = (y * canvas.width + x) * 4;

      const tolerance = 20;
      const r_ok = pixels[pos] >= startR - tolerance && pixels[pos] <= startR + tolerance;
      const g_ok = pixels[pos + 1] >= startG - tolerance && pixels[pos + 1] <= startG + tolerance;
      const b_ok = pixels[pos + 2] >= startB - tolerance && pixels[pos + 2] <= startB + tolerance;
      const a_ok = pixels[pos + 3] >= startA - tolerance && pixels[pos + 3] <= startA + tolerance;
      
      if (!r_ok || !g_ok || !b_ok || !a_ok) {
        continue;
      }
      
      // If pixel is already filled, skip
      if (pixels[pos] === fillR && pixels[pos+1] === fillG && pixels[pos+2] === fillB) {
        continue;
      }

      pixels[pos] = fillR;
      pixels[pos + 1] = fillG;
      pixels[pos + 2] = fillB;
      pixels[pos + 3] = 255;

      stack.push([x + 1, y]);
      stack.push([x - 1, y]);
      stack.push([x, y + 1]);
      stack.push([x, y - 1]);
    }

    ctx.putImageData(imageData, 0, 0);
  }
}

export default ToolManager;