# Fim do Mês — aplicativo de celular

Um app de finanças pessoais que roda na tela inicial do celular, em tela cheia e sem internet.

## O que tem nesta pasta

| Arquivo | Para que serve |
|---|---|
| `index.html` | O app inteiro |
| `manifest.webmanifest` | Nome, ícone e cores do app no sistema |
| `sw.js` | Faz o app funcionar sem internet |
| `icone-*.png`, `apple-touch-icon.png`, `favicon.png` | Ícones |

**Os arquivos precisam ficar juntos na mesma pasta.** Publique todos.

---

## Publicar no GitHub Pages

Precisa estar num endereço `https://` — é exigência dos celulares para instalar o app e para o modo offline funcionar. O GitHub Pages é gratuito e resolve.

1. Crie um repositório novo no GitHub, por exemplo `fim-do-mes`. Pode ser público ou privado.
2. Envie **todos** os arquivos desta pasta para a raiz do repositório (botão *Add file → Upload files*, arraste tudo, depois *Commit changes*).
3. No repositório, vá em **Settings → Pages**.
4. Em *Source*, escolha **Deploy from a branch**; em *Branch*, escolha `main` e a pasta `/ (root)`. Salve.
5. Espere um ou dois minutos. O endereço aparece no topo dessa mesma tela, algo como:
   `https://seu-usuario.github.io/fim-do-mes/`
6. Abra esse endereço no celular.

---

## Instalar no celular

### Android (Chrome)
Ao abrir o endereço, aparece uma faixa roxa no topo com o botão **Instalar**. Se não aparecer, abra o menu de três pontinhos e escolha **Instalar aplicativo**.

### iPhone (Safari)
O iPhone não tem botão de instalar; o caminho é manual e **só funciona no Safari**, não no Chrome:

1. Toque em **Compartilhar** (o quadrado com a seta para cima, na barra de baixo).
2. Role a lista e escolha **Adicionar à Tela de Início**.
3. Toque em **Adicionar**.

Pronto: o ícone fica junto dos seus outros apps e abre sem a barra do navegador.

---

## Onde ficam seus dados

Tudo fica **dentro do seu aparelho**. Nada é enviado para lugar nenhum, não existe conta nem login, e ninguém além de você tem acesso.

A consequência disso é que os dados **não passam sozinhos de um aparelho para outro**. Para levar do computador ao celular:

1. No aparelho de origem: **Ajustes → Exportar backup**. Sai um arquivo `.json`.
2. Mande esse arquivo para você mesma (e-mail, WhatsApp, Drive).
3. No outro aparelho: **Ajustes → Importar backup** e escolha o arquivo.

Vale exportar de vez em quando. Se você limpar os dados de navegação do celular, o app é apagado junto.

---

## Publicar uma versão nova

Ao trocar o `index.html` por uma versão atualizada, **abra o `sw.js` e mude o número da versão**:

```js
const VERSAO = 'fim-do-mes-v2';   // era v1
```

Sem isso, os celulares que já instalaram continuam abrindo a versão antiga guardada. Depois de trocar, o app avisa "Nova versão disponível" e basta fechar e abrir.

---

## Perguntas rápidas

**Funciona sem internet?** Sim, depois da primeira abertura. Lançar, editar, ver gráficos — tudo funciona no modo avião.

**Aparece na Play Store ou na App Store?** Não. Ele é instalado direto pelo navegador, sem loja, sem conta de desenvolvedor e sem custo. Para as lojas seria necessário empacotar o app e pagar as taxas anuais de cada plataforma.

**Dá para usar sem publicar em lugar nenhum?** Dá, abrindo o `index.html` direto no navegador — mas aí não dá para instalar na tela inicial nem usar offline, e os dados ficam presos àquele navegador.

**Preciso saber programar para manter?** Não. Para atualizar, é só subir o arquivo novo e mudar o número da versão no `sw.js`.
