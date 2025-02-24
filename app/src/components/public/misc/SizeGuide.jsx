import { path } from "@/conf/main";
import React from "react";

const sizes = [
  { eu: 32, us: 1, uk: 0.5, cm: 20 },
  { eu: 33, us: 2, uk: 1, cm: 20.5 },
  { eu: 34, us: 3, uk: 2, cm: 21.5 },
  { eu: 35, us: 4, uk: 3, cm: 22 },
  { eu: 36, us: 5, uk: 4, cm: 23 },
  { eu: 37, us: 6, uk: 5, cm: 24 },
  { eu: 38, us: 7, uk: 6, cm: 25 },
  { eu: 39, us: 8, uk: 7, cm: 25.5 },
  { eu: 40, us: 9, uk: 8, cm: 26.5 },
  { eu: 41, us: 10, uk: 9, cm: 27 },
  { eu: 42, us: 11, uk: 10, cm: 28 },
  { eu: 43, us: 12, uk: 11, cm: 28.5 },
  { eu: 44, us: 13, uk: 12, cm: 29.5 },
  { eu: 45, us: 14, uk: 13, cm: 30 },
  { eu: 46, us: 15, uk: 14, cm: 31 },
];

export default function SizeGuide() {
  return (
    <div className="mx-auto max-w-3xl p-6 text-center">
      <h1 className="mb-4 flex items-center justify-center gap-2 text-3xl font-bold">
        Size Guide
      </h1>
      <p className="mb-6 text-gray-600">Find the perfect size for your shoes</p>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-center">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">EU Size</th>
              <th className="border p-2">US Size</th>
              <th className="border p-2">UK Size</th>
              <th className="border p-2">CM</th>
            </tr>
          </thead>
          <tbody>
            {sizes.map((size) => (
              <tr key={size.eu} className="hover:bg-gray-100">
                <td className="border p-2">{size.eu}</td>
                <td className="border p-2">{size.us}</td>
                <td className="border p-2">{size.uk}</td>
                <td className="border p-2">{size.cm} cm</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h3 className="mt-5 text-lg font-bold">HEEL-TOE LENGTH</h3>
      <p className="text-gray-700">
        Place a piece of paper on the floor with one end against a wall. Stand
        on the piece of paper with your heel against the wall. Mark the piece of
        paper where your toes end with a pencil.
      </p>
      <p className="mt-3 text-gray-700">
        Measure from the end of the piece of paper to the mark you created with
        your pencil and compare the measurement to our sizing chart.
      </p>
      <h3 className="mt-5 text-lg font-bold">CHOOSE THE RIGHT SIZE</h3>
      <p className="text-gray-700">
        That's easier said than done. Because, what do you do if you are in
        between two sizes?
      </p>
      <p className="mt-3 text-gray-700">
        In this case, it might be safest to go for the size up, rather than the
        size down. And you know what? You can just try them on at home.
      </p>
      <p className="mt-3 text-gray-700">
        Not the right size? Don't worry! Return your items for free within 30
        days. Check out our
        <a className="text-blue-600" href={path.public.shipping}>
          {" "}
          shipping and return policy{" "}
        </a>
        for more details.
      </p>
      <p className="mt-5 text-sm text-gray-600">
        * Measurements may vary slightly depending on the model.
      </p>
    </div>
  );
}
