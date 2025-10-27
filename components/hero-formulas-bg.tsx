// Fondo decorativo de fórmulas matemáticas para el Hero
// @ts-ignore
import { BlockMath } from "react-katex"

export function HeroFormulasBg() {
  return (
    <>
      <style>{`
  @keyframes float1 { 
    0% { transform: translate(0, 0); opacity: 1; } 
    25% { transform: translate(20px, -20px); opacity: 0.3; } 
    50% { transform: translate(0, -40px); opacity: 0.1; } 
    75% { transform: translate(-20px, -20px); opacity: 0.3; } 
    100% { transform: translate(0, 0); opacity: 1; } 
  }
  @keyframes float2 { 
    0% { transform: translate(0, 0); opacity: 1; } 
    25% { transform: translate(-20px, 20px); opacity: 0.2; } 
    50% { transform: translate(0, 40px); opacity: 0; } 
    75% { transform: translate(20px, 20px); opacity: 0.2; } 
    100% { transform: translate(0, 0); opacity: 1; } 
  }
  @keyframes float3 { 
    0% { transform: translate(0, 0); opacity: 1; } 
    25% { transform: translate(20px, 20px); opacity: 0.4; } 
    50% { transform: translate(40px, 0); opacity: 0.1; } 
    75% { transform: translate(20px, -20px); opacity: 0.4; } 
    100% { transform: translate(0, 0); opacity: 1; } 
  }
  @keyframes float4 { 
    0% { transform: translate(0, 0); opacity: 1; } 
    25% { transform: translate(-20px, -20px); opacity: 0.3; } 
    50% { transform: translate(-40px, 0); opacity: 0; } 
    75% { transform: translate(-20px, 20px); opacity: 0.3; } 
    100% { transform: translate(0, 0); opacity: 1; } 
  }
  @keyframes float5 { 
    0% { transform: translate(0, 0); opacity: 1; } 
    25% { transform: translate(15px, -15px); opacity: 0.2; } 
    50% { transform: translate(30px, -30px); opacity: 0; } 
    75% { transform: translate(15px, -15px); opacity: 0.2; } 
    100% { transform: translate(0, 0); opacity: 1; } 
  }
  @keyframes float6 { 
    0% { transform: translate(0, 0); opacity: 1; } 
    25% { transform: translate(-15px, 15px); opacity: 0.4; } 
    50% { transform: translate(-30px, 30px); opacity: 0.1; } 
    75% { transform: translate(-15px, 15px); opacity: 0.4; } 
    100% { transform: translate(0, 0); opacity: 1; } 
  }
`}</style>

      <div className="absolute inset-0 opacity-20 pointer-events-none z-0 text-white">
        {/* Lado izquierdo - Problemas inversos básicos */}
        <div style={{position:'absolute',top:'8%',left:'5%',fontSize:'1.1rem',color:'white',animation:'float1 8s ease-in-out infinite'}}><BlockMath math="y = Hx" /></div>
        <div style={{position:'absolute',top:'16%',left:'10%',fontSize:'1.1rem',color:'white',animation:'float2 10s ease-in-out infinite'}}><BlockMath math="Ax = b" /></div>
        <div style={{position:'absolute',top:'24%',left:'3%',fontSize:'1.1rem',color:'white',animation:'float3 12s ease-in-out infinite'}}><BlockMath math="A^{\dagger} = (A^T A)^{-1} A^T" /></div>
        <div style={{position:'absolute',top:'32%',left:'12%',fontSize:'1.1rem',color:'white',animation:'float4 9s ease-in-out infinite'}}><BlockMath math="x_{TSVD} = \sum_{i=1}^k \frac{u_i^T b}{\sigma_i} v_i" /></div>
        <div style={{position:'absolute',top:'40%',left:'7%',fontSize:'1.1rem',color:'white',animation:'float5 11s ease-in-out infinite'}}><BlockMath math="\text{SVD}: A = U\Sigma V^T" /></div>
        <div style={{position:'absolute',top:'48%',left:'2%',fontSize:'1.1rem',color:'white',animation:'float6 13s ease-in-out infinite'}}><BlockMath math="L_{curve}" /></div>
        <div style={{position:'absolute',top:'56%',left:'15%',fontSize:'1.1rem',color:'white',animation:'float1 10s ease-in-out infinite'}}><BlockMath math="GCV(\lambda) = \frac{\|Ax_{\lambda} - b\|^2}{trace(I - AA_{\lambda}^{\dagger})^2}" /></div>
        <div style={{position:'absolute',top:'64%',left:'8%',fontSize:'1.1rem',color:'white',animation:'float2 12s ease-in-out infinite'}}><BlockMath math="x_{Tikho} = (A^T A + \lambda I)^{-1} A^T b" /></div>
        <div style={{position:'absolute',top:'72%',left:'4%',fontSize:'1.1rem',color:'white',animation:'float3 14s ease-in-out infinite'}}><BlockMath math="\kappa(A) = \frac{\sigma_{max}}{\sigma_{min}}" /></div>
        <div style={{position:'absolute',top:'80%',left:'18%',fontSize:'1.1rem',color:'white',animation:'float4 8s ease-in-out infinite'}}><BlockMath math="\mathbb{E}[X] = \int x p(x) dx" /></div>

        {/* Centro - Regularización y métodos iterativos */}
        <div style={{position:'absolute',top:'5%',left:'35%',fontSize:'1.1rem',color:'white',animation:'float3 11s ease-in-out infinite'}}><BlockMath math="x^* = \arg\min_x \|Ax-b\|^2 + \lambda R(x)" /></div>
        <div style={{position:'absolute',top:'15%',left:'42%',fontSize:'1.1rem',color:'white',animation:'float1 13s ease-in-out infinite'}}><BlockMath math="R(x) = \|x\|_1" /></div>
        <div style={{position:'absolute',top:'25%',left:'38%',fontSize:'1.1rem',color:'white',animation:'float2 9s ease-in-out infinite'}}><BlockMath math="R(x) = \|x\|_{TV}" /></div>
        <div style={{position:'absolute',top:'35%',left:'45%',fontSize:'1.1rem',color:'white',animation:'float4 10s ease-in-out infinite'}}><BlockMath math="R(x) = \|Dx\|_1" /></div>
        <div style={{position:'absolute',top:'45%',left:'32%',fontSize:'1.1rem',color:'white',animation:'float5 12s ease-in-out infinite'}}><BlockMath math="x_{k+1} = x_k - \alpha_k \nabla f(x_k)" /></div>
        <div style={{position:'absolute',top:'55%',left:'40%',fontSize:'1.1rem',color:'white',animation:'float6 8s ease-in-out infinite'}}><BlockMath math="CG: r_k = b - Ax_k" /></div>
        <div style={{position:'absolute',top:'65%',left:'48%',fontSize:'1.1rem',color:'white',animation:'float1 14s ease-in-out infinite'}}><BlockMath math="CGLS: \min \|Ax - b\|^2" /></div>
        <div style={{position:'absolute',top:'75%',left:'35%',fontSize:'1.1rem',color:'white',animation:'float2 11s ease-in-out infinite'}}><BlockMath math="LSQR: QR = A^T" /></div>
        <div style={{position:'absolute',top:'85%',left:'43%',fontSize:'1.1rem',color:'white',animation:'float3 9s ease-in-out infinite'}}><BlockMath math="x_{CGME} = V_k y_k" /></div>

        {/* Lado derecho - Transformadas y métricas */}
        <div style={{position:'absolute',top:'6%',left:'65%',fontSize:'1.1rem',color:'white',animation:'float2 13s ease-in-out infinite'}}><BlockMath math="\mathcal{F}(f)(\xi) = \int_{-\infty}^{\infty} f(x) e^{-2\pi i x \xi} dx" /></div>
        <div style={{position:'absolute',top:'14%',left:'78%',fontSize:'1.1rem',color:'white',animation:'float4 10s ease-in-out infinite'}}><BlockMath math="\mathcal{F}^{-1}(F)(x) = \int_{-\infty}^{\infty} F(\xi) e^{2\pi i x \xi} d\xi" /></div>
        <div style={{position:'absolute',top:'22%',left:'70%',fontSize:'1.1rem',color:'white',animation:'float1 12s ease-in-out infinite'}}><BlockMath math="W(f) = \int_{-\infty}^{\infty} f(t) \psi^*(\frac{t-b}{a}) dt" /></div>
        <div style={{position:'absolute',top:'30%',left:'82%',fontSize:'1.1rem',color:'white',animation:'float5 8s ease-in-out infinite'}}><BlockMath math="CT: g(\theta, s) = \int f(x,y) \delta(x\cos\theta + y\sin\theta - s) dx dy" /></div>
        <div style={{position:'absolute',top:'38%',left:'68%',fontSize:'1.1rem',color:'white',animation:'float6 14s ease-in-out infinite'}}><BlockMath math="FBP: f(x,y) = \int_0^{\pi} Q_{\theta}(x\cos\theta + y\sin\theta) d\theta" /></div>
        <div style={{position:'absolute',top:'46%',left:'75%',fontSize:'1.1rem',color:'white',animation:'float3 11s ease-in-out infinite'}}><BlockMath math="ART: x_j^{k+1} = x_j^k + \lambda \frac{b_i - \sum a_{ij} x_j^k}{\sum a_{ij}^2} a_{ij}" /></div>
        <div style={{position:'absolute',top:'54%',left:'85%',fontSize:'1.1rem',color:'white',animation:'float1 9s ease-in-out infinite'}}><BlockMath math="SIRT: x_j^{k+1} = x_j^k + \lambda \sum \frac{b_i - \sum a_{ij} x_j^k}{\sum a_{ij}^2} a_{ij}" /></div>
        <div style={{position:'absolute',top:'62%',left:'72%',fontSize:'1.1rem',color:'white',animation:'float2 10s ease-in-out infinite'}}><BlockMath math="D_{KL}(p\|q) = \int p(x) \log \frac{p(x)}{q(x)} dx" /></div>
        <div style={{position:'absolute',top:'70%',left:'80%',fontSize:'1.1rem',color:'white',animation:'float4 12s ease-in-out infinite'}}><BlockMath math="PSNR = 10 \log_{10} \frac{MAX^2}{MSE}" /></div>
        <div style={{position:'absolute',top:'78%',left:'66%',fontSize:'1.1rem',color:'white',animation:'float5 13s ease-in-out infinite'}}><BlockMath math="SSIM(x, y) = \frac{(2\mu_x\mu_y + c_1)(2\sigma_{xy} + c_2)}{(\mu_x^2 + \mu_y^2 + c_1)(\sigma_x^2 + \sigma_y^2 + c_2)}" /></div>
        <div style={{position:'absolute',top:'86%',left:'88%',fontSize:'1.1rem',color:'white',animation:'float6 8s ease-in-out infinite'}}><BlockMath math="MSE = \frac{1}{n} \sum_{i=1}^n (x_i - y_i)^2" /></div>
      </div>
    </>
  )
}
