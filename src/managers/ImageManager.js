class ImageManager {
      loadImage(page, canvas, ctx) {
        if (!page || !page.imageUrl) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          return;
        }
        
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = page.imageUrl;
        
        img.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          const canvasAspectRatio = canvas.width / canvas.height;
          const imageAspectRatio = img.width / img.height;
          
          let drawWidth, drawHeight, x, y;

          if (canvasAspectRatio > imageAspectRatio) {
            drawHeight = canvas.height;
            drawWidth = img.width * (canvas.height / img.height);
            x = (canvas.width - drawWidth) / 2;
            y = 0;
          } else {
            drawWidth = canvas.width;
            drawHeight = img.height * (canvas.width / img.width);
            x = 0;
            y = (canvas.height - drawHeight) / 2;
          }
          
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, x, y, drawWidth, drawHeight);
        };

        img.onerror = () => {
          console.error("Failed to load image:", page.imageUrl);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = "red";
          ctx.font = "16px Arial";
          ctx.fillText("Error loading image.", 10, 50);
        };
      }
    }

    export default ImageManager;