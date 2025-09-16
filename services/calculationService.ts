
interface Sides {
  north: number;
  south: number;
  east: number;
  west: number;
}

interface CalculationResult {
  area: number | null;
  error: string | null;
}

/**
 * Calculates the area of a quadrilateral using Brahmagupta's formula,
 * which applies to cyclic quadrilaterals. This is a common method
 * for estimating area when only four side lengths are known.
 * @param a - length of side a
 * @param b - length of side b
 * @param c - length of side c
 * @param d - length of side d
 * @returns The area of the quadrilateral, or null if the sides cannot form a valid quadrilateral.
 */
const brahmagupta = (a: number, b: number, c: number, d: number): number | null => {
  // Calculate the semi-perimeter
  const s = (a + b + c + d) / 2;

  // Check if any side is longer than the sum of the others.
  // This is implicitly checked by ensuring (s - side) is positive.
  const term = (s - a) * (s - b) * (s - c) * (s - d);

  if (term < 0) {
    // The given side lengths cannot form a convex cyclic quadrilateral.
    return null;
  }

  // Calculate the area
  return Math.sqrt(term);
};


export const calculateQuadrilateralArea = (sides: Sides): CalculationResult => {
  const { north, south, east, west } = sides;

  if (isNaN(north) || isNaN(south) || isNaN(east) || isNaN(west)) {
      return { area: null, error: 'Semua input harus diisi dengan angka yang valid.' };
  }

  if (north <= 0 || south <= 0 || east <= 0 || west <= 0) {
      return { area: null, error: 'Panjang semua sisi harus lebih besar dari nol.' };
  }

  const totalArea = brahmagupta(north, east, south, west);

  if (totalArea === null) {
      return { 
          area: null, 
          error: 'Ukuran sisi yang diberikan tidak membentuk bidang yang valid. Pastikan panjang satu sisi tidak lebih besar dari jumlah tiga sisi lainnya.' 
      };
  }

  if (isNaN(totalArea) || totalArea === 0) {
      return { area: null, error: 'Perhitungan menghasilkan area yang tidak valid. Periksa kembali angka yang Anda masukkan.' };
  }

  return { area: totalArea, error: null };
};
