describe("Teste de Login", () => {
  beforeEach(() => {
    // visitar a página de login antes de cada teste
    cy.visit("./site/index.html");
  });

  it("Cenário 1: Campos vazios", () => {
    cy.get("#username").clear();
    cy.get("#password2").clear();
    cy.get("#button").click();
    cy.get("#error-message").should(
      "contain",
      "E-mail e senha são obrigatórios!"
    );
  });

  it("Cenário 2: E-mail Válido e Senha Inválida", () => {
    cy.get("#username").type("usuario@example.com");
    cy.get("#password2").type("senhaInvalida");
    cy.get("#button").click();
    cy.get("#error-message").should("contain", "E-mail ou senha inválidos!");
  });

  it("Cenário 3: E-mail Inválido e Senha Válida", () => {
    cy.get("#username").type("usuarioexample.com"); // E-mail inválido
    cy.get("#password2").type("1q2w3e4r"); // Senha válida
    cy.get("#button").click(); // Clica no botão de login
    cy.get("#error-message").should("contain", "E-mail inválido!"); // Verifica se a mensagem de erro é exibida
  });

  it("Cenário 4: Ambos Inválidos", () => {
    cy.get("#username").type("usuarioexample.com"); // E-mail inválido
    cy.get("#password2").type("senhaIncorreta"); // Senha inválida
    cy.get("#button").click(); // Clica no botão de login
    cy.get("#error-message").should("contain", "E-mail inválido!"); // Verifica se a mensagem de erro é exibida)
  });

  it("Cenário 5: Ambos Válidos", () => {
    cy.get("#username").type("usuario@example.com");
    cy.get("#password2").type("1q2w3e4r");
    cy.get("#button").click();
    cy.url().should("include", "welcome/index.html");
    cy.contains("Bem vindo").should("be.visible");
  });

  it("Cenário 6: Alternar visibilidade da senha", () => {
    cy.get("#password2").type("123456");
    cy.get("#togglePassword2").click();
    cy.get("#password2").should("have.attr", "type", "text");
    cy.get("#togglePassword2").click();
    cy.get("#password2").should("have.attr", "type", "password");
  });

  it("Cenário 7: Login com Enter no campo senha", () => {
    cy.get("#username").type("usuario@example.com"); // E-mail válido
    cy.get("#password2").type("1q2w3e4r{enter}"); // Senha válida e pressionando Enter
    cy.url().should("include", "welcome/index.html"); // Verifica se a URL é a esperada após o login
  });

  it("Cenário 8: Redirecionamento após login bem-sucedido", () => {
    cy.get("#username").type("usuario2@example.com");
    cy.get("#password2").type("senhaCorreta");
    cy.get("#button").click();

    // aguarda e verifica o redirecionamento
    cy.url().should("include", "welcome/index.html"); // Verifica se a URL é a esperada após o login
    cy.contains("Bem vindo").should("be.visible"); // Verifica se a mensagem de boas-vindas está visível
  });

  it("Cenário 9: Mensagem de erro some após dados válidos", () => {
    cy.get("#button").click(); // Tenta com campos vazios
    cy.get("#error-message").should(
      "contain",
      "E-mail e senha são obrigatórios!"
    );

    // Corrige os dados
    cy.get("#username").type("usuario2@example.com");
    cy.get("#password2").type("senhaCorreta");
    cy.get("#button").click();

    // Verifica que mensagem de erro desapareceu
    cy.get("#error-message").should("not.exist");
  });

  it("Cenário 10: Elementos da tela de login existem", () => {
    cy.get("#username").should("exist");
    cy.get("#password2").should("exist");
    cy.get("#button").should("exist").and("contain.text", "Entrar");
  });
  
});


