
import React, { useState, useCallback } from 'react';
import Diagram from './components/Diagram';
import { calculateQuadrilateralArea } from './services/calculationService';

interface SidesInput {
    north: string;
    south: string;
    east: string;
    west: string;
}

const App: React.FC = () => {
    const [sides, setSides] = useState<SidesInput>({
        north: '',
        south: '',
        east: '',
        west: '',
    });
    const [area, setArea] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSides(prev => ({ ...prev, [name]: value }));
    };

    const handleCalculate = useCallback(() => {
        setError(null);
        setArea(null);

        const numericSides = {
            north: parseFloat(sides.north),
            south: parseFloat(sides.south),
            east: parseFloat(sides.east),
            west: parseFloat(sides.west),
        };

        const result = calculateQuadrilateralArea(numericSides);

        if (result.error) {
            setError(result.error);
        } else if (result.area !== null) {
            setArea(result.area);
        }
    }, [sides]);

    return (
        <main className="bg-slate-100 min-h-screen flex items-center justify-center p-4 font-sans">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl max-w-3xl w-full transform transition-all duration-500">
                <div className="text-center mb-6">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Kalkulator Luas Tanah</h1>
                    <p className="text-gray-600 mt-2">Hitung perkiraan luas kavling 4 sisi tidak beraturan.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Input Form */}
                    <div className="space-y-4">
                        <InputGroup label="Sisi Utara (m)" name="north" value={sides.north} onChange={handleInputChange} />
                        <InputGroup label="Sisi Selatan (m)" name="south" value={sides.south} onChange={handleInputChange} />
                        <InputGroup label="Sisi Barat (m)" name="west" value={sides.west} onChange={handleInputChange} />
                        <InputGroup label="Sisi Timur (m)" name="east" value={sides.east} onChange={handleInputChange} />
                    </div>

                    {/* Diagram */}
                    <Diagram />
                </div>

                <div className="mt-8">
                    <button
                        onClick={handleCalculate}
                        className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
                    >
                        Hitung Luas
                    </button>
                </div>

                {error && (
                    <div className="mt-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-800 rounded-r-lg animate-fade-in">
                        <p className="font-bold">Error</p>
                        <p>{error}</p>
                    </div>
                )}

                {area !== null && (
                    <div className="mt-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-800 rounded-r-lg animate-fade-in">
                        <p className="font-bold text-lg">Hasil Perhitungan</p>
                        <p className="text-2xl font-semibold">
                            Estimasi Luas Tanah: {area.toFixed(2)} m²
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
};


interface InputGroupProps {
    label: string;
    name: keyof SidesInput;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputGroup: React.FC<InputGroupProps> = ({ label, name, value, onChange }) => (
    <div>
        <label htmlFor={name} className={`block text-sm font-medium text-gray-700`}>
            {label}
        </label>
        <input
            type="number"
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder="0"
            className={`mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
        />
    </div>
);


export default App;
