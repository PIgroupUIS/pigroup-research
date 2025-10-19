// Fondo decorativo de fórmulas matemáticas para el Hero
// @ts-ignore
import { BlockMath } from "react-katex"

export function HeroFormulasBg() {
  return (
    <>
      <style>{`
  @keyframes float1 { 
    0% { transform: translate(0, 0); } 
    25% { transform: translate(20px, -20px); } 
    50% { transform: translate(0, -40px); } 
    75% { transform: translate(-20px, -20px); } 
    100% { transform: translate(0, 0); } 
  }
  @keyframes float2 { 
    0% { transform: translate(0, 0); } 
    25% { transform: translate(-20px, 20px); } 
    50% { transform: translate(0, 40px); } 
    75% { transform: translate(20px, 20px); } 
    100% { transform: translate(0, 0); } 
  }
  @keyframes float3 { 
    0% { transform: translate(0, 0); } 
    25% { transform: translate(20px, 20px); } 
    50% { transform: translate(40px, 0); } 
    75% { transform: translate(20px, -20px); } 
    100% { transform: translate(0, 0); } 
  }
  @keyframes float4 { 
    0% { transform: translate(0, 0); } 
    25% { transform: translate(-20px, -20px); } 
    50% { transform: translate(-40px, 0); } 
    75% { transform: translate(-20px, 20px); } 
    100% { transform: translate(0, 0); } 
  }
`}</style>

      <div className="absolute inset-0 opacity-20 pointer-events-none z-0 text-white">
        <div style={{position:'absolute',top:'4%',left:'5%',fontSize:'1.1rem',color:'white',animation:'float1 8s ease-in-out infinite'}}><BlockMath math="y = Hx" /></div>
        <div style={{position:'absolute',top:'10%',left:'12%',fontSize:'1.1rem',color:'white',animation:'float2 10s ease-in-out infinite'}}><BlockMath math="Ax = b" /></div>
        <div style={{position:'absolute',top:'18%',left:'7%',fontSize:'1.1rem',color:'white',animation:'float3 12s ease-in-out infinite'}}><BlockMath math="R(x) = \|x\|_1" /></div>
        <div style={{position:'absolute',top:'25%',left:'20%',fontSize:'1.1rem',color:'white',animation:'float4 9s ease-in-out infinite'}}><BlockMath math="R(x) = \|x\|_{TV}" /></div>
        <div style={{position:'absolute',top:'32%',left:'15%',fontSize:'1.1rem',color:'white',animation:'float1 11s ease-in-out infinite'}}><BlockMath math="R(x) = \|x\|_*" /></div>
        <div style={{position:'absolute',top:'8%',left:'60%',fontSize:'1.1rem',color:'white',animation:'float2 13s ease-in-out infinite'}}><BlockMath math="x^* = \arg\min_x \|Ax-b\|^2 + \lambda R(x)" /></div>
        <div style={{position:'absolute',top:'20%',left:'70%',fontSize:'1.1rem',color:'white',animation:'float3 10s ease-in-out infinite'}}><BlockMath math="R(x) = \|Dx\|_1" /></div>
        <div style={{position:'absolute',top:'28%',left:'80%',fontSize:'1.1rem',color:'white',animation:'float4 12s ease-in-out infinite'}}><BlockMath math="\mathcal{F}(f)(\xi) = \int_{-\infty}^{\infty} f(x) e^{-2\pi i x \xi} dx" /></div>
        <div style={{position:'absolute',top:'36%',left:'75%',fontSize:'1.1rem',color:'white',animation:'float1 9s ease-in-out infinite'}}><BlockMath math="\mathcal{F}^{-1}(F)(x) = \int_{-\infty}^{\infty} F(\xi) e^{2\pi i x \xi} d\xi" /></div>
        <div style={{position:'absolute',top:'44%',left:'60%',fontSize:'1.1rem',color:'white',animation:'float2 8s ease-in-out infinite'}}><BlockMath math="D_{KL}(p\|q) = \int p(x) \log \frac{p(x)}{q(x)} dx" /></div>
        <div style={{position:'absolute',top:'52%',left:'80%',fontSize:'1.1rem',color:'white',animation:'float3 10s ease-in-out infinite'}}><BlockMath math="H(X) = -\sum p(x) \log p(x)" /></div>
        <div style={{position:'absolute',top:'60%',left:'70%',fontSize:'1.1rem',color:'white',animation:'float4 11s ease-in-out infinite'}}><BlockMath math="MSE = \frac{1}{n} \sum_{i=1}^n (x_i - y_i)^2" /></div>
        <div style={{position:'absolute',top:'68%',left:'60%',fontSize:'1.1rem',color:'white',animation:'float1 12s ease-in-out infinite'}}><BlockMath math="SSIM(x, y)" /></div>
        <div style={{position:'absolute',top:'76%',left:'80%',fontSize:'1.1rem',color:'white',animation:'float2 13s ease-in-out infinite'}}><BlockMath math="PSNR = 10 \log_{10} \frac{MAX^2}{MSE}" /></div>
        <div style={{position:'absolute',top:'84%',left:'70%',fontSize:'1.1rem',color:'white',animation:'float3 9s ease-in-out infinite'}}><BlockMath math="MAE = \frac{1}{n} \sum_{i=1}^n |x_i - y_i|" /></div>
        <div style={{position:'absolute',top:'92%',left:'80%',fontSize:'1.1rem',color:'white',animation:'float4 10s ease-in-out infinite'}}><BlockMath math="\text{Conv}(f,g)(x) = \int f(t)g(x-t)dt" /></div>
        <div style={{position:'absolute',top:'60%',left:'10%',fontSize:'1.1rem',color:'white',animation:'float1 11s ease-in-out infinite'}}><BlockMath math="\text{SVD}: A = U\Sigma V^T" /></div>
        <div style={{position:'absolute',top:'70%',left:'20%',fontSize:'1.1rem',color:'white',animation:'float2 10s ease-in-out infinite'}}><BlockMath math="\mathbb{E}[X] = \int x p(x) dx" /></div>
      </div>
    </>
  )
}
