// 複利計算ロジック
export const calculateInvestment = (
  monthlyAmount: number, // 毎月の積立額
  annualRate: number,   // 年率（％）
  years: number         // 期間（年）
) => {
  const monthlyRate = annualRate / 100 / 12;
  const months = years * 12;
  let totalData = [];
  let currentBalance = 0;
  let totalPrincipal = 0;

  for (let i = 1; i <= months; i++) {
    currentBalance = (currentBalance + monthlyAmount) * (1 + monthlyRate);
    totalPrincipal += monthlyAmount;

    // 1年ごとのデータをグラフ用に抽出
    if (i % 12 === 0) {
      totalData.push({
        year: i / 12,
        total: Math.round(currentBalance),
        principal: Math.round(totalPrincipal),
        profit: Math.round(currentBalance - totalPrincipal),
      });
    }
  }
  return totalData;
};