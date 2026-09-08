# Ligar o login e a sincronização

Você faz isso **uma vez**, no computador, em uns 5 minutos. Depois é só entrar com e-mail e senha em qualquer aparelho.

## Por que precisa de configuração

Para os mesmos valores aparecerem no celular e no notebook, eles precisam ficar guardados num servidor que os dois consultam. Esse servidor tem que estar **numa conta sua** — só assim os dados são seus de verdade, e ninguém além de você tem a chave.

Vamos usar o **Supabase**: tem plano gratuito, não pede cartão de crédito, e cuida do login e do banco de dados.

---

## Passo 1 — Criar o projeto

1. Acesse **supabase.com** e clique em *Start your project*. Entre com GitHub ou com e-mail.
2. Clique em **New project**.
3. Preencha:
   - **Name**: `fim-do-mes`
   - **Database Password**: clique em *Generate a password*. **Você não vai precisar dela no dia a dia**, mas guarde num lugar seguro.
   - **Region**: escolha `South America (São Paulo)` — fica mais rápido.
4. Clique em **Create new project** e espere uns 2 minutos.

## Passo 2 — Criar a tabela

1. No menu lateral, clique em **SQL Editor** e depois em **New query**.
2. Cole exatamente isto:

```sql
create table if not exists public.dados (
  usuario_id uuid primary key references auth.users on delete cascade,
  conteudo jsonb not null,
  atualizado_em timestamptz not null default now()
);

alter table public.dados enable row level security;

create policy "cada um lê o seu"
  on public.dados for select using (auth.uid() = usuario_id);

create policy "cada um cria o seu"
  on public.dados for insert with check (auth.uid() = usuario_id);

create policy "cada um atualiza o seu"
  on public.dados for update using (auth.uid() = usuario_id)
  with check (auth.uid() = usuario_id);
```

3. Clique em **Run**. Deve aparecer *Success*.

> Essas três últimas regras são o que garante que **cada pessoa só enxerga os próprios dados**, mesmo estando todos no mesmo banco. Não pule esse passo.

## Passo 3 — Pegar as duas chaves

1. No menu lateral, vá em **Project Settings** (a engrenagem) → **API**.
2. Copie os dois valores:
   - **Project URL** — algo como `https://abcdefgh.supabase.co`
   - **anon public** — um texto longo começando com `eyJ...`

> A chave `anon` é feita para ficar no aplicativo, é pública por design. Quem protege seus dados são as regras do Passo 2. **Nunca use a chave `service_role`** — essa sim é secreta.

## Passo 4 — Ligar no app

1. Abra o app → **Ajustes** → **Sua conta** → **Configurar sincronização**.
2. Cole a URL e a chave. Clique em **Salvar e testar**.
3. Se aparecer *"Servidor conectado"*, deu certo. Crie sua conta com e-mail e senha.

## Passo 5 — Nos outros aparelhos

Em cada aparelho novo, repita **só o Passo 4** (colar URL e chave) e depois **entre** com o mesmo e-mail e senha. Seus dados aparecem sozinhos.

---

## Sobre a confirmação por e-mail

Por padrão o Supabase manda um e-mail de confirmação ao criar a conta. Se preferir entrar direto, sem esse passo:

**Authentication → Sign In / Providers → Email** e desligue *Confirm email*.

Como a conta é só sua, desligar é seguro e evita dor de cabeça.

---

## Como funciona no dia a dia

- Um selo no topo mostra a situação: **sincronizado**, **sincronizando**, **offline** ou um aviso de erro. Tocar nele leva a Ajustes.
- **Sem internet o app continua funcionando normalmente.** As mudanças ficam guardadas no aparelho e sobem sozinhas quando a conexão volta.
- Ao abrir o app, ele busca o que mudou nos outros aparelhos.
- Se um aparelho tiver dados diferentes dos da conta, o app **pergunta qual versão manter** em vez de escolher por você.

## Se você não quiser nada disso

O app funciona perfeitamente sem conta, guardando tudo só no aparelho — que é como ele estava antes. Na tela de entrada há a opção **"Usar só neste aparelho, sem conta"**, e a exportação de backup continua disponível em Ajustes.

---

## Quando algo dá errado

| Mensagem | O que fazer |
|---|---|
| *Falta criar a tabela no Supabase* | O Passo 2 não rodou. Volte no SQL Editor e execute de novo. |
| *A chave do Supabase parece errada* | Você copiou a chave errada ou incompleta. Confira em Project Settings → API. |
| *Confirme seu e-mail antes de entrar* | Veja sua caixa de entrada, ou desligue o *Confirm email* como explicado acima. |
| *Muitas tentativas seguidas* | Proteção do Supabase. Espere um minuto. |
| *Sem conexão* | O app continua funcionando; ele sobe as mudanças sozinho depois. |

O plano gratuito do Supabase pausa projetos sem uso por uma semana. Se isso acontecer, basta entrar no painel e clicar em *Restore*. Usando o app regularmente, não acontece.
