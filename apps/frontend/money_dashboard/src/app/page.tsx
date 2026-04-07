"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { calculateInvestment } from "@/lib/calculations"
import { Sparkles, TrendingUp, Wallet } from "lucide-react"
const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

export default function MoneyDashboard() {
  const [amount, setAmount] = useState(30000)
  const [rate, setRate] = useState(5)
  const [years, setYears] = useState(20)

  const data = useMemo(() => calculateInvestment(amount, rate, years), [amount, rate, years])
  const lastData = data[data.length - 1]

  const adjustAmount = (delta: number) => setAmount(prev => clamp(prev + delta, 0, 100000))
  const adjustRate = (delta: number) => setRate(prev => Number(clamp(prev + delta, 0, 15).toFixed(1)))
  const adjustYears = (delta: number) => setYears(prev => clamp(prev + delta, 0, 40))
  
  return (
    <div className="min-h-screen bg-background p-6 md:p-12 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Money Dashboard</h1>
        <p className="text-muted-foreground">資産形成の未来を、3台のRaspberry Piクラスターからお届けします。</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <Card className="lg:col-span-4 border-none shadow-lg bg-secondary/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Wallet className="w-5 h-5" /> シミュレーション設定</CardTitle>
          </CardHeader>
          <CardContent className="space-y-10">
            <div className="space-y-4">
              <div className="flex justify-between font-medium">
                <Label>毎月の積立額</Label>
                <span className="text-primary">{amount.toLocaleString()}円</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <button
                    className="h-10 w-10 rounded-md border border-border bg-background text-sm font-semibold"
                    onClick={() => adjustAmount(-1000)}
                  >
                    -
                  </button>
                </div>
                <Slider value={[amount]} max={100000} step={1000} onValueChange={(v) => setAmount(v[0])} className="flex-1" />
                
                <div className="flex gap-2">
                  <button
                    className="h-10 w-10 rounded-md border border-border bg-background text-sm font-semibold"
                    onClick={() => adjustAmount(1000)}
                  >
                    +
                  </button>
                </div>
              </div>
              
            </div>

            <div className="space-y-4">
              <div className="flex justify-between font-medium">
                <Label>想定利回り (年率)</Label>
                <span className="text-primary">{rate}%</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <button
                    className="h-10 w-10 rounded-md border border-border bg-background text-sm font-semibold"
                    onClick={() => adjustRate(-0.1)}
                  >
                    -
                  </button>
                </div>
                <Slider value={[rate]} max={15} step={0.1} onValueChange={(v) => setRate(v[0])} className="flex-1" />
                <div className="flex gap-2">
                  <button
                    className="h-10 w-10 rounded-md border border-border bg-background text-sm font-semibold"
                    onClick={() => adjustRate(0.1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between font-medium">
                <Label>積立期間</Label>
                <span className="text-primary">{years}年</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <button
                    className="h-10 w-10 rounded-md border border-border bg-background text-sm font-semibold"
                    onClick={() => adjustYears(-1)}
                  >
                    -
                  </button>
                </div>
                <Slider value={[years]} max={40} step={1} onValueChange={(v) => setYears(v[0])} className="flex-1" />
                <div className="flex gap-2">
                  <button
                    className="h-10 w-10 rounded-md border border-border bg-background text-sm font-semibold"
                    onClick={() => adjustYears(1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 右側：グラフとAI分析（仮） */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="border-none shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>資産推移予測</CardTitle>
                <CardDescription>{years}年後の合計：{lastData?.total.toLocaleString()}円</CardDescription>
              </div>
              <TrendingUp className="text-blue-500 w-8 h-8" />
            </CardHeader>
            <CardContent className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 10000}万`} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                    formatter={(v: any) => v ? [`${Number(v).toLocaleString()}円`] : ["0円"]}
                  />
                  <Legend iconType="circle" />
                  <Bar dataKey="principal" name="元本" stackId="a" fill="#94a3b8" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="profit" name="運用収益" stackId="a" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* AI分析エリア（将来用） */}
          <Card className="border-dashed border-2 bg-blue-50/10 dark:bg-blue-900/10">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-500 rounded-full text-white">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-blue-600 dark:text-blue-400">AI Analysis Insight</p>
                    <Badge variant="outline" className="text-[10px] py-0">Beta</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    利回り{rate}%での運用は非常に現実的です。{years}年後には元本の約{(lastData?.total / lastData?.principal).toFixed(1)}倍の資産を築ける可能性があります。
                    (ここに将来的にPython + FastAPI経由でAIの分析結果を表示させます)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}