import { useState, useCallback } from 'react'
import { analyzeImageGrid } from '@/utils/image-grid-util'
import { ImageAnalysisResult } from '@/types/toolcase'

export function useAutoLabelMap() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const analyzeGrid = useCallback(async (
        imageUrl: string,
        rows: number,
        cols: number,
        options = {}
    ): Promise<ImageAnalysisResult> => {
        try {
            setError(null)
            setLoading(true)
            return await analyzeImageGrid(imageUrl, rows, cols, options)
        } catch (error) {
            setError((error as Error).message)
            throw null
        } finally {
            setLoading(false)
        }
    }, [])

    return {analyzeGrid, loading, error};
}