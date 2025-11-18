import React, { useMemo, useState } from "react";

// — Preços (você pode ajustar livremente) —
const PRICES = {
  whatsapp: 150, // R$ por conta/mês
  social: 60,    // R$ por conta/mês
  user: 50,      // R$ por usuário/mês
  broadcast: 97, // R$ fixo/mês
  setup: 297,    // R$ único
};

// Mantendo o gradiente e sombra azuis/cianos, mas com opacidade ajustada
const SHADOW = "shadow-[0_0_15px_3px_rgba(83,18,189,0.2)]"; 
const GRADIENT = "bg-[linear-gradient(0deg,rgba(59,120,204,0.3)_0%,rgba(97,229,255,0.2)_100%)]"; 

function formatBRL(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function StepBadge({ n, active }) {
  return (
    <div
      className={`h-8 w-8 min-w-[32px] rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 select-none ${
        active ? `${GRADIENT} text-zinc-900 ${SHADOW}` : "bg-zinc-800 text-zinc-300"
      }`}
    >
      {n}
    </div>
  );
}

function Field({ label, required, children }) {
  return (
    <label className="block text-sm">
      {/* Cor do label ajustada para zinc-800 para contraste com fundo claro */}
      <span className="mb-1 inline-block text-zinc-800">
        {label} {required && <span className="text-rose-600">*</span>} {/* Rose mais escuro */}
      </span>
      {children}
    </label>
  );
}

function Input(props) {
  return (
    <input
      {...props}
      // Cor de foco voltando para sky-400
      // Cor do texto ajustada para zinc-900 para contraste com fundo claro nos inputs
      className={`w-full rounded-xl bg-zinc-100/60 border border-zinc-300/70 px-3 py-2 text-zinc-900 placeholder-zinc-500 outline-none focus:ring-2 focus:ring-sky-400 ${SHADOW}`}
    />
  );
}

function RangeControl({ label, value, setValue, min = 0, max = 100, step = 1, badge }) {
  return (
    <div className={`p-5 rounded-2xl bg-zinc-100/60 border border-zinc-300 ${SHADOW}`}>
      <div className="flex items-center justify-between flex-wrap"> {/* Flex-wrap adicionado para garantir quebra em telas muito pequenas */}
        {/* Cor do label e badge ajustadas para zinc-900 */}
        <div className="text-lg font-semibold text-zinc-900">{label}</div>
        {badge && (
          <span className={`${GRADIENT} ${SHADOW} text-xs text-zinc-900 font-bold px-3 py-1 rounded-full mt-2 sm:mt-0`}>{badge}</span>
        )}
      </div>

      <div className="mt-4 flex items-center gap-2 sm:gap-3"> {/* Reduzindo gap para mobile */}
        <button
          type="button"
          onClick={() => setValue(Math.max(min, value - step))}
          className={`h-9 w-9 sm:h-10 sm:w-10 rounded-xl border border-zinc-400 flex items-center justify-center text-xl ${GRADIENT} ${SHADOW} text-zinc-900 shrink-0`}
          aria-label="Diminuir"
        >
          –
        </button>

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          // Cor de acento voltando para sky-400
          className="flex-1 accent-sky-400" 
        />

        <button
          type="button"
          onClick={() => setValue(Math.min(max, value + step))}
          className={`h-9 w-9 sm:h-10 sm:w-10 rounded-xl border border-zinc-400 flex items-center justify-center text-xl ${GRADIENT} ${SHADOW} text-zinc-900 shrink-0`}
          aria-label="Aumentar"
        >
          +
        </button>

        {/* Cor do valor ajustada para zinc-900 */}
        <div className="w-16 sm:w-24 text-right text-lg font-semibold text-zinc-900 shrink-0"> {/* Reduzindo largura para mobile */}
          {value}
        </div>
      </div>
    </div>
  );
}

function Toggle({ checked, onChange, label, hint }) {
  return (
    <div className={`p-5 rounded-2xl bg-zinc-100/60 border border-zinc-300 ${SHADOW}`}>
      <div className="flex items-center justify-between gap-3">
        <div>
          {/* Cor do label e hint ajustadas para zinc-900 */}
          <div className="text-lg font-semibold text-zinc-900">{label}</div>
          {hint && <div className="text-xs text-zinc-600 mt-1">{hint}</div>}
        </div>
        <button
          type="button"
          onClick={() => onChange(!checked)}
          className={`relative inline-flex h-8 w-14 items-center rounded-full transition shrink-0 ${ // shrink-0 adicionado
            // Cor de fundo do Toggle voltando para sky-400/80
            checked ? "bg-sky-400/80" : "bg-zinc-500" // Ajustado para zinc-500 para contraste
          }`}
          aria-pressed={checked}
        >
          <span
            className={`inline-block h-6 w-6 transform rounded-full bg-white transition ${
              checked ? "translate-x-7" : "translate-x-1"
            }`}
          />
        </button>
      </div>
    </div>
  );
}

function PriceSummary({ qWhats, qSocial, qUsers, broadcast, billing }) {
  const monthly = useMemo(() => {
    return qWhats * PRICES.whatsapp + qSocial * PRICES.social + qUsers * PRICES.user + (broadcast ? PRICES.broadcast : 0);
  }, [qWhats, qSocial, qUsers, broadcast]);

  const yearlyMonthly = monthly * 0.8; // 20% OFF
  const setup = billing === "anual" ? 0 : PRICES.setup;

  const header = (
    <div className={`rounded-2xl p-6 text-center text-zinc-900 ${GRADIENT} ${SHADOW}`}>
      <div className="text-sm">{billing === "anual" ? "Plano Anual" : "Plano Mensal"}</div>
      <div className="text-4xl font-black tracking-tight mt-1">
        {billing === "anual" ? formatBRL(yearlyMonthly) : formatBRL(monthly)}
      </div>
      <div className="text-xs mt-1">por mês</div>
      {billing === "anual" && (
        <div className="mt-3 text-xs font-semibold">20% de desconto • Setup grátis</div>
      )}
    </div>
  );

  const economy = billing === "anual" ? monthly * 12 - yearlyMonthly * 12 : 0;

  return (
    <div className="space-y-4">
      {header}
      {billing === "anual" && (
        // Cor da borda ajustada para zinc-400
        <div className={`rounded-xl px-4 py-2 text-xs text-center border border-zinc-400 ${SHADOW} text-zinc-800`}>
          Economia estimada no ano: <b>{formatBRL(economy)}</b>
        </div>
      )}

      {/* Cor do background e borda ajustada */}
      <div className="rounded-2xl border border-zinc-400 bg-zinc-100/60 p-5 space-y-2">
        {/* Cores de texto ajustadas para contraste */}
        <div className="text-sm font-semibold text-zinc-900">Resumo do plano</div>
        <div className="text-sm text-zinc-700">WhatsApp ({qWhats}x): <span className="float-right text-zinc-900">{formatBRL(qWhats * PRICES.whatsapp)}</span></div>
        <div className="text-sm text-zinc-700">Redes Sociais ({qSocial}x): <span className="float-right text-zinc-900">{formatBRL(qSocial * PRICES.social)}</span></div>
        <div className="text-sm text-zinc-700">Usuários ({qUsers}x): <span className="float-right text-zinc-900">{formatBRL(qUsers * PRICES.user)}</span></div>
        <div className="text-sm text-zinc-700">Disparo de Mensagem: <span className="float-right text-zinc-900">{broadcast ? formatBRL(PRICES.broadcast) : "—"}</span></div>
        <div className="text-sm text-zinc-700">Setup (único): <span className="float-right text-zinc-900">{formatBRL(setup)}</span></div>
      </div>
    </div>
  );
}

// — Modal de Checkout —
function CheckoutModal({ open, onClose, payload }) {
  const [step, setStep] = useState(1);
  const [billing, setBilling] = useState("mensal");
  const [form1, setForm1] = useState({ nome: "", tel: "", email: "", cpf: "" });
  const [form2, setForm2] = useState({ cnpj: "", razao: "" });
  const [form3, setForm3] = useState({ cep: "", numero: "", complemento: "", bairro: "", cidade: "", estado: "" });
  const [errors, setErrors] = useState({});

  const monthly = payload.monthly;
  const annualMonthly = monthly * 0.8;

  function validate() {
    const errs = {};
    if (step === 1) {
      if (!form1.nome) errs.nome = "Obrigatório";
      if (!form1.tel) errs.tel = "Obrigatório";
      if (!form1.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form1.email)) errs.email = "E-mail inválido";
      if (!form1.cpf) errs.cpf = "Obrigatório";
    } else if (step === 3) {
      // NOTE: Step 2 fields (CNPJ, Razão) are optional, so no validation here
      ["cep", "numero", "bairro", "cidade", "estado"].forEach((k) => {
        if (!form3[k]) errs[k] = "Obrigatório";
      });
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function next() {
    if (!validate()) return;
    setStep((s) => Math.min(3, s + 1));
  }

  function prev() {
    setStep((s) => Math.max(1, s - 1));
  }

  // Substituí o 'alert' por um modal simples de sucesso
  function showSuccessMessage() {
    const messageBox = document.createElement('div');
    messageBox.className = 'fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4'; // Adicionado p-4 para mobile
    messageBox.innerHTML = `
      <div class="bg-zinc-100 p-8 rounded-xl shadow-2xl border border-zinc-300 text-center w-full max-w-sm">
        <!-- Cor do título voltando para sky-400 --><h3 class="text-xl font-bold text-sky-400 mb-4">Sucesso!</h3>
        <p class="text-zinc-700 mb-6">O plano foi enviado para processamento. Veja os detalhes no console do navegador.</p>
        <button id="close-success-message" class="w-full rounded-xl py-2 font-semibold ${GRADIENT} ${SHADOW} text-zinc-900 hover:opacity-95">
          Fechar
        </button>
      </div>
    `;
    document.body.appendChild(messageBox);
    document.getElementById('close-success-message').onclick = () => {
      document.body.removeChild(messageBox);
    };
  }


  function finish() {
    if (!validate()) return;
    const data = {
      plano: {
        billing,
        qWhats: payload.qWhats,
        qSocial: payload.qSocial,
        qUsers: payload.qUsers,
        broadcast: payload.broadcast,
        mensal: monthly,
        mensalAnual: annualMonthly,
      },
      dadosPessoais: form1,
      empresa: form2,
      endereco: form3,
    };
    // Aqui você integra com seu backend. Por hora, apenas mostramos no console.
    console.log("Checkout submetido:", data);
    showSuccessMessage();
    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"> {/* Adicionado padding aqui para mobile */}
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* Content — W-11/12 para garantir que não fique grudado nas bordas do celular */}
      <div className={`relative w-full max-w-2xl sm:w-11/12 rounded-3xl border border-zinc-400 overflow-hidden ${SHADOW}`}>
        <div className={`px-4 sm:px-6 py-4 bg-slate-500`}> {/* Reduzindo px para mobile */}
          <div className="flex items-center justify-between text-zinc-900">
            <div className="text-lg sm:text-xl font-extrabold">Finalizar Contratação</div> {/* Reduzindo tamanho da fonte para mobile */}
            <button onClick={onClose} className="text-zinc-900/70 hover:text-zinc-900 text-2xl leading-none">×</button>
          </div>
          
          {/* Indicador de passos ajustado para mobile (compacto) */}
          <div className="mt-3 flex items-center justify-between text-center">
            {/* Step 1 */}
            <div className="flex flex-col items-center flex-1 min-w-0">
              <StepBadge n={1} active={step === 1} />
              <div className="text-[10px] font-semibold text-zinc-900 mt-1 sm:mt-0">Dados Pessoais</div>
            </div>
            {/* Divider 1 */}
            <div className={`h-0.5 w-full max-w-[20px] sm:max-w-[40px] rounded-full transition-all mx-1 sm:mx-2 ${step > 1 ? `${GRADIENT}` : 'bg-zinc-900/50'}`}></div>

            {/* Step 2 */}
            <div className="flex flex-col items-center flex-1 min-w-0">
              <StepBadge n={2} active={step === 2} />
              <div className="text-[10px] font-semibold text-zinc-900 mt-1 sm:mt-0">Empresa</div>
            </div>
            {/* Divider 2 */}
            <div className={`h-0.5 w-full max-w-[20px] sm:max-w-[40px] rounded-full transition-all mx-1 sm:mx-2 ${step > 2 ? `${GRADIENT}` : 'bg-zinc-900/50'}`}></div>

            {/* Step 3 */}
            <div className="flex flex-col items-center flex-1 min-w-0">
              <StepBadge n={3} active={step === 3} />
              <div className="text-[10px] font-semibold text-zinc-900 mt-1 sm:mt-0">Endereço</div>
            </div>
          </div>
        </div>

        <div className="bg-zinc-100 p-4 sm:p-6"> {/* Fundo do modal ajustado */}
          {/* Plano selecionado */}
          <div className="rounded-xl border border-zinc-400 bg-zinc-200/40 p-4 text-sm mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <div className="text-zinc-800 mb-3 sm:mb-0">  
              <div className="font-semibold text-zinc-900">Plano Selecionado:</div>
              <div className="text-xs text-zinc-600">
                {payload.qWhats} WhatsApp, {payload.qUsers} usuários, {payload.qSocial} redes, Disparo {payload.broadcast ? "ativado" : "desativado"}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-zinc-600">Total Mensal</div>
              <div className="text-xl font-extrabold text-zinc-900">{formatBRL(billing === "anual" ? annualMonthly : monthly)}</div>
            </div>
          </div>

          {/* Escolha do tipo de plano */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              onClick={() => setBilling("mensal")}
              className={`rounded-2xl px-3 py-3 border transition ${billing === "mensal" ? `${GRADIENT} ${SHADOW} text-zinc-900 border-transparent` : "border-zinc-400 bg-zinc-200/40 text-zinc-800 hover:bg-zinc-200/70"}`}
            >
              <div className="font-bold text-sm">Mensal</div>
              {/* Ajuste de tamanho da fonte para os valores */}
              <div className="text-xl font-extrabold mt-1 leading-tight">{formatBRL(monthly)}</div>
              <div className="text-xs opacity-80 -mt-0.5">por mês</div>
            </button>
            <button
              onClick={() => setBilling("anual")}
              className={`rounded-2xl px-3 py-3 border transition ${billing === "anual" ? `${GRADIENT} ${SHADOW} text-zinc-900 border-transparent` : "border-zinc-400 bg-zinc-200/40 text-zinc-800 hover:bg-zinc-200/70"}`}
            >
              {/* Adicionado flex para garantir que o texto "20% OFF" não quebre muito mal */}
              <div className="font-bold text-sm flex items-center justify-center">Anual <span className="ml-1 text-[8px] font-black px-1.5 py-0.5 rounded-full bg-emerald-500/90 text-white">20% OFF</span></div>
              {/* Ajuste de tamanho da fonte para os valores */}
              <div className="text-xl font-extrabold mt-1 leading-tight">{formatBRL(annualMonthly)}</div>
              <div className="text-xs opacity-80 -mt-0.5">por mês • Setup grátis</div>
            </button>
          </div>

          {/* Steps */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Nome Completo" required>
                  <Input value={form1.nome} onChange={(e) => setForm1({ ...form1, nome: e.target.value })} placeholder="Seu nome" />
                  {errors.nome && <p className="text-xs text-rose-600 mt-1">{errors.nome}</p>}
                </Field>
                <Field label="Telefone" required>
                  <Input value={form1.tel} onChange={(e) => setForm1({ ...form1, tel: e.target.value })} placeholder="(11) 99999-9999" />
                  {errors.tel && <p className="text-xs text-rose-600 mt-1">{errors.tel}</p>}
                </Field>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="E-mail" required>
                  <Input type="email" value={form1.email} onChange={(e) => setForm1({ ...form1, email: e.target.value })} placeholder="email@dominio.com" />
                  {errors.email && <p className="text-xs text-rose-600 mt-1">{errors.email}</p>}
                </Field>
                <Field label="CPF" required>
                  <Input value={form1.cpf} onChange={(e) => setForm1({ ...form1, cpf: e.target.value })} placeholder="000.000.000-00" />
                  {errors.cpf && <p className="text-xs text-rose-600 mt-1">{errors.cpf}</p>}
                </Field>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="CNPJ (opcional)">
                  <Input value={form2.cnpj} onChange={(e) => setForm2({ ...form2, cnpj: e.target.value })} placeholder="00.000.000/0000-00" />
                </Field>
                <Field label="Razão Social (opcional)">
                  <Input value={form2.razao} onChange={(e) => setForm2({ ...form2, razao: e.target.value })} placeholder="Empresa LTDA" />
                </Field>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="CEP" required>
                  <Input value={form3.cep} onChange={(e) => setForm3({ ...form3, cep: e.target.value })} placeholder="00000-000" />
                  {errors.cep && <p className="text-xs text-rose-600 mt-1">{errors.cep}</p>}
                </Field>
                <Field label="Número" required>
                  <Input value={form3.numero} onChange={(e) => setForm3({ ...form3, numero: e.target.value })} placeholder="123" />
                  {errors.numero && <p className="text-xs text-rose-600 mt-1">{errors.numero}</p>}
                </Field>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Complemento">
                  <Input value={form3.complemento} onChange={(e) => setForm3({ ...form3, complemento: e.target.value })} placeholder="Apto / Bloco" />
                </Field>
                <Field label="Bairro" required>
                  <Input value={form3.bairro} onChange={(e) => setForm3({ ...form3, bairro: e.target.value })} placeholder="Centro" />
                  {errors.bairro && <p className="text-xs text-rose-600 mt-1">{errors.bairro}</p>}
                </Field>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Cidade" required>
                  <Input value={form3.cidade} onChange={(e) => setForm3({ ...form3, cidade: e.target.value })} placeholder="São Paulo" />
                  {errors.cidade && <p className="text-xs text-rose-600 mt-1">{errors.cidade}</p>}
                </Field>
                <Field label="Estado" required>
                  <Input value={form3.estado} onChange={(e) => setForm3({ ...form3, estado: e.target.value })} placeholder="SP" />
                  {errors.estado && <p className="text-xs text-rose-600 mt-1">{errors.estado}</p>}
                </Field>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 flex items-center justify-between">
            <button onClick={onClose} className="text-sm px-3 py-2 rounded-xl bg-zinc-300 border border-zinc-400 text-zinc-800 hover:bg-zinc-400 transition">Cancelar</button>
            <div className="flex gap-2">
              {step > 1 && (
                <button onClick={prev} className="text-sm px-3 py-2 rounded-xl bg-zinc-300 border border-zinc-400 text-zinc-800 hover:bg-zinc-400 transition">Voltar</button>
              )}
              {step < 3 ? (
                <button onClick={next} className={`text-sm px-4 py-2 rounded-xl font-semibold ${GRADIENT} ${SHADOW} text-zinc-900 hover:opacity-95 transition bg-slate-300 hover:bg-slate-400`}>Próximo</button>
              ) : (
                <button onClick={finish} className={`text-sm px-4 py-2 rounded-xl font-semibold ${GRADIENT} ${SHADOW} text-zinc-900 hover:opacity-95 transition`}>Finalizar Contratação</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() { // Componente principal App, padrão para a visualização
  // Quantidades
  const [qWhats, setQWhats] = useState(10);
  const [qSocial, setQSocial] = useState(15);
  const [qUsers, setQUsers] = useState(50);
  const [broadcast, setBroadcast] = useState(true);
  const [billing, setBilling] = useState("mensal"); // "mensal" | "anual"
  const [openCheckout, setOpenCheckout] = useState(false);

  const monthly = useMemo(() => {
    return qWhats * PRICES.whatsapp + qSocial * PRICES.social + qUsers * PRICES.user + (broadcast ? PRICES.broadcast : 0);
  }, [qWhats, qSocial, qUsers, broadcast]);

  const annualMonthly = monthly * 0.8; // 20% off

  const payload = { qWhats, qSocial, qUsers, broadcast, monthly };

  return (
    // Fundo principal alterado para a cor #91BEFF e texto padrão para zinc-950
    <div className="min-h-screen w-full bg-[#ffffff] text-zinc-950 font-sans">
      <style>
        {`
          /* Custom track for the range input for better aesthetics */
          input[type=range]::-webkit-slider-runnable-track {
            height: 8px;
            border-radius: 4px;
            background: #cbd5e1; /* zinc-300 para contraste com o fundo claro */
          }
          input[type=range]:focus::-webkit-slider-runnable-track {
            background: #cbd5e1;
          }
          input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: 20px;
            width: 20px;
            border-radius: 50%;
            /* Cor do thumb voltando para sky-400 */
            background: #38bdf8; 
            cursor: pointer;
            margin-top: -6px; /* center the thumb */
            border: 2px solid #fff;
            /* Cor da sombra do thumb voltando para sky-400 */
            box-shadow: 0 0 5px rgba(56, 189, 248, 0.7);
          }
        `}
      </style>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10"> {/* Padding vertical ajustado para mobile */}
        <div className="mb-6 sm:mb-8"> {/* Margem ajustada para mobile */}
          {/* Cores de texto ajustadas para contraste */}
          <h1 className="text-2xl md:text-3xl font-extrabold text-zinc-900">Configure seu plano personalizado</h1>
          <p className="text-zinc-700 mt-2 max-w-2xl text-sm">Monte o plano perfeito para o seu time e pague apenas pelo que usar. Valores são estimativas mensais em BRL (R$).</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Coluna de controles */}
          <div className="lg:col-span-2 space-y-5">
            <RangeControl label="Contas WhatsApp" value={qWhats} setValue={setQWhats} min={0} max={50} step={1} badge={`${qWhats} contas`} />
            <RangeControl label="Contas Redes Sociais" value={qSocial} setValue={setQSocial} min={0} max={50} step={1} badge={`${qSocial} contas`} />
            <RangeControl label="Usuários" value={qUsers} setValue={setQUsers} min={1} max={250} step={1} badge={`${qUsers} usuários`} />
            <Toggle
              checked={broadcast}
              onChange={setBroadcast}
              label="Módulo Disparo de Mensagem"
              hint={`${formatBRL(PRICES.broadcast)}/mês – envio em massa e campanhas`}
            />
          </div>

          {/* Coluna de preço/resumo */}
          <div className="space-y-5">
            {/* Background da coluna de preço/resumo ajustado para transparente ou quase */}
            <div className={`rounded-3xl p-5 border border-zinc-400 bg-zinc-100/60 ${SHADOW}`}>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setBilling("mensal")}
                  className={`rounded-2xl px-3 py-3 border transition ${billing === "mensal" ? `${GRADIENT} ${SHADOW} text-zinc-900 border-transparent` : "border-zinc-400 bg-zinc-200/40 text-zinc-800 hover:bg-zinc-200/70"}`}
                >
                  <div className="text-xs sm:text-sm">Plano Mensal</div>
                  {/* Ajuste de tamanho da fonte para os valores e leading-tight para evitar overflow */}
                  <div className="text-xl font-extrabold mt-1 leading-tight">{formatBRL(monthly)}</div>
                  <div className="text-[10px] sm:text-xs opacity-80 -mt-0.5">por mês</div>
                </button>
                <button
                  onClick={() => setBilling("anual")}
                  className={`rounded-2xl px-3 py-3 border transition ${billing === "anual" ? `${GRADIENT} ${SHADOW} text-zinc-900 border-transparent` : "border-zinc-400 bg-zinc-200/40 text-zinc-800 hover:bg-zinc-200/70"}`}
                >
                  {/* Adicionado flex para organizar o texto e o badge */}
                  <div className="text-xs sm:text-sm flex items-center justify-center gap-1 sm:gap-2">Plano Anual <span className="text-[8px] sm:text-[10px] font-black px-1.5 py-0.5 rounded-full bg-emerald-500/90 text-white">20% OFF</span></div>
                  {/* Ajuste de tamanho da fonte para os valores e leading-tight para evitar overflow */}
                  <div className="text-xl font-extrabold mt-1 leading-tight">{formatBRL(annualMonthly)}</div>
                  <div className="text-[10px] sm:text-xs opacity-80 -mt-0.5">por mês</div>
                </button>
              </div>

              <div className="mt-4">
                <PriceSummary qWhats={qWhats} qSocial={qSocial} qUsers={qUsers} broadcast={broadcast} billing={billing} />
              </div>

              <button
                onClick={() => setOpenCheckout(true)}
                className={`mt-5 w-full rounded-2xl py-3 font-semibold bg-slate-300 hover:bg-slate-400 ${GRADIENT} ${SHADOW} text-zinc-900 hover:opacity-95 transition`}
              >
                Contratar Plano
              </button>
            </div>

            {/* Background do aviso ajustado para transparente ou quase */}
            <div className={`rounded-2xl p-4 text-xs text-zinc-700 border border-zinc-400 bg-zinc-100/60 ${SHADOW}`}>
              <div>Valores meramente ilustrativos. Impostos podem variar conforme sua localidade.</div>
              <div className="mt-1">Suporte e onboarding inclusos em todos os planos.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Checkout */}
      <CheckoutModal
        open={openCheckout}
        onClose={() => setOpenCheckout(false)}
        payload={payload}
      />
    </div>
  );
}