import { PixelAnalysisOptions, ImageAnalysisResult } from '../types/toolcase';

export async function analyzeImageGrid(
    imageUrl: string,
    rows: number,
    cols: number,
    options: PixelAnalysisOptions = {}
): Promise<ImageAnalysisResult> {
    const {
        threshold = 50,
        targetColor,
        sampleEvery = 4
    } = options;

    const img = await loadImage(imageUrl);
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get canvas context');

    ctx.drawImage(img, 0, 0);
    
    const cellWidth = img.width / cols;
    const cellHeight = img.height / rows;
    
    const gridData: boolean[][] = Array(rows)
        .fill(false)
        .map(() => Array(cols).fill(false));

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
        const x = col * cellWidth;
        const y = row * cellHeight;
        
        const imageData = ctx.getImageData(x, y, cellWidth, cellHeight);
        gridData[row][col] = detectDrawingInPixels(
            imageData.data,
            { threshold, targetColor, sampleEvery }
        );
        }
    }

    return { gridData, cellWidth, cellHeight };
}

export function loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = url;
        img.onload = () => resolve(img);
        img.onerror = reject;
    });
}

export function createCanvas(width: number, height: number): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas;
}

export function detectDrawingInPixels(
  pixelData: Uint8ClampedArray,
  options: PixelAnalysisOptions = {}
): boolean {
    const {
        threshold = 50,
        targetColor,
        sampleEvery = 4
    } = options;

    // Convert to steps of 4 (RGBA) multiplied by sampleEvery
    const step = 4 * sampleEvery;

    for (let i = 0; i < pixelData.length; i += step) {
        const r = pixelData[i];
        const g = pixelData[i + 1];
        const b = pixelData[i + 2];

        if (targetColor) {
        // Color-specific detection
        const colorDistance = Math.sqrt(
            Math.pow(r - targetColor.r, 2) +
            Math.pow(g - targetColor.g, 2) +
            Math.pow(b - targetColor.b, 2)
        );
        if (colorDistance < threshold) return true;
        } else {
        // Brightness detection
        const brightness = (r + g + b) / 3;
        if (brightness < 255 - threshold) return true;
        }
    }

  return false;
}