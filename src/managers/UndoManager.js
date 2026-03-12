class UndoManager {
  constructor(maxStates = 50) {
    this.states = [];
    this.currentIndex = -1;
    this.maxStates = maxStates;
  }

  saveState(canvas) {
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    // Remove any states after current index (if we undid and then did something new)
    this.states = this.states.slice(0, this.currentIndex + 1);
    
    // Add new state
    this.states.push(imageData);
    
    // Keep only maxStates number of states
    if (this.states.length > this.maxStates) {
      this.states.shift();
    } else {
      this.currentIndex++;
    }
  }

  undo(canvas) {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      const ctx = canvas.getContext('2d');
      ctx.putImageData(this.states[this.currentIndex], 0, 0);
    }
  }

  redo(canvas) {
    if (this.currentIndex < this.states.length - 1) {
      this.currentIndex++;
      const ctx = canvas.getContext('2d');
      ctx.putImageData(this.states[this.currentIndex], 0, 0);
    }
  }

  clear() {
    this.states = [];
    this.currentIndex = -1;
  }

  getLastState() {
    if (this.currentIndex >= 0) {
      return this.states[this.currentIndex];
    }
    return null;
  }

  getPreviousState() {
    if (this.currentIndex > 0) {
      return this.states[this.currentIndex - 1];
    }
    return null;
  }
}

export default UndoManager;