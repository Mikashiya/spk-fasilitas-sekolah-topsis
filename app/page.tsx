import Container from "./_ui/container"

import dataProvinsi2025 from "@/lib/data_provinsi_2025.json"
interface dataProvinsi2025Item {
  id: string,
  nama_provinsi: string,
  c1_aba: number,
  c2_apm: number,
  c3_aps: number,
  c4_jdbs: number,
}

import dataKriteria2025 from '@/lib/data_kriteria_2025.json'
interface dataKriteria2025item {
  id: string,
  nama_kriteria: string,
  singkatan_kriteria: string,
  tipe_kriteria: string,
  bobot_kriteria: number,
  deskripsi_kriteria: string,
  sumber_kriteria: string,
}

export default async function Home() {
  const dp2025rows: dataProvinsi2025Item[] = Object.entries(dataProvinsi2025.dp2025).map(
    ([id, item]) => ({
      id,
      ...item,
    })
  )

  const dk2025rows: dataKriteria2025item[] = Object.entries(dataKriteria2025.dk2025).map(
    ([id, item]) => ({
      id,
      ...item,
    })
  )

  type KriteriaKey = "c1_aba" | "c2_apm" | "c3_aps" | "c4_jdbs"
  const KriteriaKeys: KriteriaKey[] = ["c1_aba", "c2_apm", "c3_aps", "c4_jdbs"]

  // 1. Matriks Keputusan (X) & Nilai Pembagi Euclidean
  // Matriks Keputusan (X)
  const totalKuadrat = KriteriaKeys.reduce((acc, key) => {
    acc[key] = dp2025rows.reduce((sum, row) => {
      const dp2025Val = Number(row[key]) || 0
      return sum + dp2025Val * dp2025Val
    }, 0)
    return acc
  }, {} as Record<KriteriaKey, number>)
  // Nilai Pembagi Euclidean
  const pembagiEuclidean = KriteriaKeys.reduce((acc, key) => {
    acc[key] = Math.sqrt(totalKuadrat[key])
    return acc
  }, {} as Record<KriteriaKey, number>)

  return (
    <Container>
        <>
          <section id="data_provinsi_2025" className="w-full h-auto p-3 flex flex-col gap-3">
            <p className="font-bold text-xl">Data Provinsi 2025</p>
            <table className="w-full h-auto table-fixed">
              <thead>
                <tr>
                  <th className="w-6 bg-zinc-700 text-white border border-zinc-100 p-1">
                    #
                  </th>
                  <th className="w-48 bg-zinc-700 text-white border border-zinc-100 p-1">
                    Nama Provinsi
                  </th>
                  <th className="w-32 md:w-16 bg-zinc-700 text-white border border-zinc-100 p-1">
                    C1 (ABA)
                  </th>
                  <th className="w-32 md:w-16 bg-zinc-700 text-white border border-zinc-100 p-1">
                    C2 (APM)
                  </th>
                  <th className="w-32 md:w-16 bg-zinc-700 text-white border border-zinc-100 p-1">
                    C3 (APS)
                  </th>
                  <th className="w-32 md:w-16 bg-zinc-700 text-white border border-zinc-100 p-1">
                    C4 (JDBS)
                  </th>
                </tr>
              </thead>
              <tbody>
                {dp2025rows.map((dp25) => (
                  <tr key={dp25.id} className="odd:bg-zinc-100 dark:odd:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all">
                    <td className="text-center p-1">{dp25.id}</td>
                    <td className="p-1">{dp25.nama_provinsi}</td>
                    <td className="text-center p-1">{dp25.c1_aba}</td>
                    <td className="text-center p-1">{dp25.c2_apm}</td>
                    <td className="text-center p-1">{dp25.c3_aps}</td>
                    <td className="text-center p-1">{dp25.c4_jdbs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
          <section id="data_kriteria_2025" className="w-full h-auto p-3 flex flex-col gap-3">
            <p className="font-bold text-xl">Data Kriteria 2025</p>
            <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-3"> 
              {dk2025rows.map((dk25) => (
                <div key={dk25.id} className="col-span-1 p-2 rounded-md shadow-md dark:bg-zinc-800 bg-white flex flex-col gap-10">
                  <p className="font-semibold text-base">{dk25.nama_kriteria} ({dk25.singkatan_kriteria})</p>
                  <p className="flex justify-between">
                    <span>Tipe: <span className="italic text-base">{dk25.tipe_kriteria}</span></span>
                    <span>Bobot (Ternormalisasi): <span className="font-semibold text-base">{dk25.bobot_kriteria}</span></span>
                  </p>
                  <p className="text-pretty">{dk25.deskripsi_kriteria}</p>
                  <p>Sumber: {dk25.sumber_kriteria}</p>
                </div>
              ))}
            </div>
          </section>
          <section id="hasil_perhitungan_2025" className="w-full h-auto p-3 flex flex-col gap-3">
            <p className="font-bold text-xl">Hasil Perhitungan 2025</p>
            <div className="flex flex-col">
              <p className="font-semibold text-red-500">1. Matriks Keputusan (X) & Nilai Pembagi Euclidean</p>
              <table className="w-full h-auto table-fixed">
                <thead>
                  <tr>
                    <th className="w-18 bg-zinc-700 text-white border border-zinc-100 p-1">
                      #
                    </th>
                    <th className="w-32 md:w-16 bg-zinc-700 text-white border border-zinc-100 p-1">
                      C1 (ABA)
                    </th>
                    <th className="w-32 md:w-16 bg-zinc-700 text-white border border-zinc-100 p-1">
                      C2 (APM)
                    </th>
                    <th className="w-32 md:w-16 bg-zinc-700 text-white border border-zinc-100 p-1">
                      C3 (APS)
                    </th>
                    <th className="w-32 md:w-16 bg-zinc-700 text-white border border-zinc-100 p-1">
                      C4 (JDBS)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="odd:bg-zinc-100 dark:odd:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all">
                    <td className="text-center p-1">Total Kuadrat</td>
                    <td className="text-center p-1">{totalKuadrat.c1_aba.toFixed(4)}</td>
                    <td className="text-center p-1">{totalKuadrat.c2_apm.toFixed(4)}</td>
                    <td className="text-center p-1">{totalKuadrat.c3_aps.toFixed(4)}</td>
                    <td className="text-center p-1">{totalKuadrat.c4_jdbs.toFixed(4)}</td>
                  </tr>
                  <tr className="odd:bg-zinc-100 dark:odd:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all">
                    <td className="text-center p-1">Pembagi Euclidean</td>
                    <td className="text-center p-1">{pembagiEuclidean.c1_aba.toFixed(4)}</td>
                    <td className="text-center p-1">{pembagiEuclidean.c2_apm.toFixed(4)}</td>
                    <td className="text-center p-1">{pembagiEuclidean.c3_aps.toFixed(4)}</td>
                    <td className="text-center p-1">{pembagiEuclidean.c4_jdbs.toFixed(4)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex flex-col">
              <p className="font-semibold text-red-500">2. Matriks Ternormalisasi (R) & Normalisasi Euclidean</p>
              <table className="w-full h-auto table-fixed">
                <thead>
                  <tr>
                    <th className="w-6 bg-zinc-700 text-white border border-zinc-100 p-1">
                      #
                    </th>
                    <th className="w-48 bg-zinc-700 text-white border border-zinc-100 p-1">
                      Nama Provinsi
                    </th>
                    <th className="w-32 md:w-16 bg-zinc-700 text-white border border-zinc-100 p-1">
                      C1 (ABA)
                    </th>
                    <th className="w-32 md:w-16 bg-zinc-700 text-white border border-zinc-100 p-1">
                      C2 (APM)
                    </th>
                    <th className="w-32 md:w-16 bg-zinc-700 text-white border border-zinc-100 p-1">
                      C3 (APS)
                    </th>
                    <th className="w-32 md:w-16 bg-zinc-700 text-white border border-zinc-100 p-1">
                      C4 (JDBS)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dp2025rows.map((dp25) => (
                    <tr key={dp25.id} className="odd:bg-zinc-100 dark:odd:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all">
                      <td className="text-center p-1">{dp25.id}</td>
                      <td className="p-1">{dp25.nama_provinsi}</td>
                      <td className="text-center p-1">{(dp25.c1_aba / pembagiEuclidean.c1_aba).toFixed(4)}</td>
                      <td className="text-center p-1">{(dp25.c2_apm / pembagiEuclidean.c2_apm).toFixed(4)}</td>
                      <td className="text-center p-1">{(dp25.c3_aps / pembagiEuclidean.c3_aps).toFixed(4)}</td>
                      <td className="text-center p-1">{(dp25.c4_jdbs / pembagiEuclidean.c4_jdbs).toFixed(4)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col">
              <p className="font-semibold text-red-500">3. Matriks Ternormalisasi Terbobot (R)</p>
              <table className="w-full h-auto table-fixed">
                <thead>
                  <tr>
                    <th className="w-6 bg-zinc-700 text-white border border-zinc-100 p-1">
                      #
                    </th>
                    <th className="w-48 bg-zinc-700 text-white border border-zinc-100 p-1">
                      Nama Provinsi
                    </th>
                    <th className="w-32 md:w-16 bg-zinc-700 text-white border border-zinc-100 p-1">
                      C1 (ABA)
                    </th>
                    <th className="w-32 md:w-16 bg-zinc-700 text-white border border-zinc-100 p-1">
                      C2 (APM)
                    </th>
                    <th className="w-32 md:w-16 bg-zinc-700 text-white border border-zinc-100 p-1">
                      C3 (APS)
                    </th>
                    <th className="w-32 md:w-16 bg-zinc-700 text-white border border-zinc-100 p-1">
                      C4 (JDBS)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dp2025rows.map((dp25) => (
                    <tr key={dp25.id} className="odd:bg-zinc-100 dark:odd:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all">
                      <td className="text-center p-1">{dp25.id}</td>
                      <td className="p-1">{dp25.nama_provinsi}</td>
                      <td className="text-center p-1">
                        {((dk2025rows.find((dk25) => dk25.singkatan_kriteria === "ABA")?.bobot_kriteria ?? 0) * (dp25.c1_aba / pembagiEuclidean.c1_aba)).toFixed(4)}
                      </td>
                      <td className="text-center p-1">
                        {((dk2025rows.find((dk25) => dk25.singkatan_kriteria === "APM")?.bobot_kriteria ?? 0) * (dp25.c2_apm / pembagiEuclidean.c2_apm)).toFixed(4)}
                      </td>
                      <td className="text-center p-1">
                        {((dk2025rows.find((dk25) => dk25.singkatan_kriteria === "APS")?.bobot_kriteria ?? 0) * (dp25.c3_aps / pembagiEuclidean.c3_aps)).toFixed(4)}
                      </td>
                      <td className="text-center p-1">
                        {((dk2025rows.find((dk25) => dk25.singkatan_kriteria === "JDBS")?.bobot_kriteria ?? 0) * (dp25.c4_jdbs / pembagiEuclidean.c4_jdbs)).toFixed(4)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {(() => {
              const getBobot = (kode: string) =>
                Number(
                  dk2025rows.find((dk25) => dk25.singkatan_kriteria === kode)
                    ?.bobot_kriteria
                ) || 0;

              const bobot = {
                c1: getBobot("ABA"),
                c2: getBobot("APM"),
                c3: getBobot("APS"),
                c4: getBobot("JDBS"),
              };

              const yRows = dp2025rows.map((item) => ({
                id: item.id,
                nama_provinsi: item.nama_provinsi,
                y1:
                  bobot.c1 *
                  (pembagiEuclidean.c1_aba === 0 ? 0 : item.c1_aba / pembagiEuclidean.c1_aba),
                y2:
                  bobot.c2 *
                  (pembagiEuclidean.c2_apm === 0 ? 0 : item.c2_apm / pembagiEuclidean.c2_apm),
                y3:
                  bobot.c3 *
                  (pembagiEuclidean.c3_aps === 0 ? 0 : item.c3_aps / pembagiEuclidean.c3_aps),
                y4:
                  bobot.c4 *
                  (pembagiEuclidean.c4_jdbs === 0 ? 0 : item.c4_jdbs / pembagiEuclidean.c4_jdbs),
              }));

              const aPlus = {
                c1: yRows.length ? Math.max(...yRows.map((r) => r.y1)) : 0,
                c2: yRows.length ? Math.min(...yRows.map((r) => r.y2)) : 0,
                c3: yRows.length ? Math.min(...yRows.map((r) => r.y3)) : 0,
                c4: yRows.length ? Math.min(...yRows.map((r) => r.y4)) : 0,
              };

              const aMinus = {
                c1: yRows.length ? Math.min(...yRows.map((r) => r.y1)) : 0,
                c2: yRows.length ? Math.max(...yRows.map((r) => r.y2)) : 0,
                c3: yRows.length ? Math.max(...yRows.map((r) => r.y3)) : 0,
                c4: yRows.length ? Math.max(...yRows.map((r) => r.y4)) : 0,
              };

              const hasilTopsis = yRows
                .map((r) => {
                  const dPlus = Math.sqrt(
                    (r.y1 - aPlus.c1) ** 2 +
                      (r.y2 - aPlus.c2) ** 2 +
                      (r.y3 - aPlus.c3) ** 2 +
                      (r.y4 - aPlus.c4) ** 2
                  );
                  const dMinus = Math.sqrt(
                    (r.y1 - aMinus.c1) ** 2 +
                      (r.y2 - aMinus.c2) ** 2 +
                      (r.y3 - aMinus.c3) ** 2 +
                      (r.y4 - aMinus.c4) ** 2
                  );
                  const penyebut = dMinus + dPlus;
                  const vi = penyebut === 0 ? 0 : dMinus / penyebut;

                  return {
                    ...r,
                    dPlus,
                    dMinus,
                    vi,
                  };
                })
                .sort((a, b) => b.vi - a.vi)
                .map((item, idx) => ({
                  ...item,
                  ranking: idx + 1,
                }));

              return (
                <div className="flex flex-col">
                  <p className="font-semibold text-red-500">
                    5. Jarak Ideal (D+ dan D-), Nilai Preferensi (Vi), dan Perangkingan Akhir
                  </p>
                  <table className="w-full h-auto table-fixed">
                    <thead>
                      <tr>
                        <th className="w-8 bg-zinc-700 text-white border border-zinc-100 p-1">
                          Peringkat
                        </th>
                        <th className="w-48 bg-zinc-700 text-white border border-zinc-100 p-1">
                          Nama Provinsi
                        </th>
                        <th className="w-32 md:w-16 bg-zinc-700 text-white border border-zinc-100 p-1">
                          Jarak Ideal Positif (D+)
                        </th>
                        <th className="w-32 md:w-16 bg-zinc-700 text-white border border-zinc-100 p-1">
                          Jarak Ideal Negatif (D-)
                        </th>
                        <th className="w-32 md:w-16 bg-zinc-700 text-white border border-zinc-100 p-1">
                          Nilai Preferensi (Vi)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {hasilTopsis.map((row) => (
                        <tr
                          key={row.id}
                          className="odd:bg-zinc-100 dark:odd:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all"
                        >
                          <td className="text-center p-1 font-semibold">#{row.ranking}</td>
                          <td className="p-1">{row.nama_provinsi}</td>
                          <td className="text-center p-1">{row.dPlus.toFixed(4)}</td>
                          <td className="text-center p-1">{row.dMinus.toFixed(4)}</td>
                          <td className="text-center p-1 font-semibold">
                            {row.vi.toFixed(4)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })()}
          </section>
        </>
    </Container>
  )
}