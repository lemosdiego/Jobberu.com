import "./PolicyPrivacy.css";

export default function PolicyPrivacy() {
  const currentYear = new Date().getFullYear();

  return (
    <section className="section-privacyPolicy">
      <div className="section-privacyPolicy_container">
        <h1 className="section-privacyPolicy_title">
          Política de Privacidade – Jobberu
        </h1>
        <p className="section-privacyPolicy_description">
          A sua privacidade é de extrema importância para nós da Jobberu. Esta
          Política de Privacidade descreve como coletamos, usamos, processamos e
          compartilhamos suas informações pessoais ao utilizar nossa plataforma.
          Ao acessar ou usar a Jobberu, você concorda com os termos desta
          Política de Privacidade.
        </p>

        <h2 className="section-privacyPolicy_subtitle">
          1. Informações que Coletamos
        </h2>
        <p className="section-privacyPolicy_description">
          Coletamos informações para fornecer e melhorar nossos serviços. As
          informações que coletamos se enquadram em duas categorias:
        </p>
        <ul className="section-privacyPolicy_list">
          <li>
            <strong>Informações Fornecidas por Você:</strong> Inclui dados que
            você nos fornece diretamente ao se cadastrar (nome, e-mail,
            telefone, CEP, endereço, senha), informações de perfil (biografia,
            título profissional, anos de experiência, links de redes sociais
            para prestadores) e fotos de perfil.
          </li>
          <li>
            <strong>Informações Coletadas Automaticamente:</strong> Podemos
            coletar automaticamente certas informações sobre seu dispositivo e
            uso da plataforma, como endereço IP, tipo de navegador, sistema
            operacional, páginas visitadas, tempo gasto na plataforma e dados de
            cookies.
          </li>
        </ul>

        <h2 className="section-privacyPolicy_subtitle">
          2. Como Usamos Suas Informações
        </h2>
        <p className="section-privacyPolicy_description">
          Utilizamos as informações coletadas para:
        </p>
        <ul className="section-privacyPolicy_list">
          <li>Fornecer, operar e manter nossos serviços;</li>
          <li>Criar e gerenciar sua conta;</li>
          <li>Conectar clientes a prestadores de serviços;</li>
          <li>Personalizar sua experiência na plataforma;</li>
          <li>Comunicar-nos com você sobre sua conta ou serviços;</li>
          <li>Melhorar a segurança e a funcionalidade da plataforma;</li>
          <li>Cumprir obrigações legais.</li>
        </ul>

        <h2 className="section-privacyPolicy_subtitle">
          3. Compartilhamento de Informações
        </h2>
        <p className="section-privacyPolicy_description">
          Não vendemos ou alugamos suas informações pessoais a terceiros.
          Podemos compartilhar suas informações nas seguintes situações:
        </p>
        <ul className="section-privacyPolicy_list">
          <li>
            <strong>Com Outros Usuários:</strong> Informações de perfil de
            prestadores (título, biografia, serviços) são visíveis para
            clientes. Informações de contato (telefone, e-mail) podem ser
            compartilhadas entre clientes e prestadores para facilitar a
            comunicação sobre serviços.
          </li>
          <li>
            <strong>Provedores de Serviço:</strong> Podemos usar terceiros para
            nos ajudar a operar e melhorar a plataforma (ex: hospedagem, análise
            de dados).
          </li>
          <li>
            <strong>Obrigações Legais:</strong> Se exigido por lei ou ordem
            judicial.
          </li>
        </ul>

        <h2 className="section-privacyPolicy_subtitle">4. Seus Direitos</h2>
        <p className="section-privacyPolicy_description">
          Você tem o direito de acessar, corrigir, atualizar ou solicitar a
          exclusão de suas informações pessoais a qualquer momento. Para exercer
          esses direitos, entre em contato conosco através dos canais
          disponíveis na plataforma.
        </p>

        <h2 className="section-privacyPolicy_subtitle">
          5. Alterações nesta Política
        </h2>
        <p className="section-privacyPolicy_description">
          Podemos atualizar nossa Política de Privacidade periodicamente.
          Notificaremos você sobre quaisquer alterações publicando a nova
          Política de Privacidade nesta página.
        </p>

        <p className="section-privacyPolicy_description">
          Última atualização: {currentYear}
        </p>
      </div>
    </section>
  );
}
