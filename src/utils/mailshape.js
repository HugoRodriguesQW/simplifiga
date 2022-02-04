export function ContactEmail({ message, email, name, upgraded }) {
  return {
    text: `Simplifi.ga
    ---
    Contato Realizado
    ---
    ${message}
    ---
    Informação do usuário:
    ---
    Nome: ${name}
    Email: ${email}
    Premium: ${upgraded}
    ---
    © simplifi.ga`,
    html: `<body
    marginheight="0"
    topmargin="0"
    marginwidth="0"
    style="margin: 0px; background-color: #f2f3f8"
    leftmargin="0"
  >
    <!--100% body table-->
    <table
      cellspacing="0"
      border="0"
      cellpadding="0"
      width="100%"
      bgcolor="#f2f3f8"
      style="
        @import url(https://fonts.googleapis.com/css2?family=Sarala:wght@400;700|Open+Sans:wght@400,700);
        font-family: Sarala, 'Open Sans', sans-serif;
      "
    >
      <tr>
        <td>
          <table
            style="background-color: #f2f3f8; max-width: 670px; margin: 0 auto"
            width="100%"
            border="0"
            align="center"
            cellpadding="0"
            cellspacing="0"
          >
            <tr>
              <td style="height: 80px">&nbsp;</td>
            </tr>
            <tr>
              <td style="text-align: center">
                <a href="https://simplifi.ga/" title="logo" target="_blank">
                  <img
                    height="40"
                    src="https://raw.githubusercontent.com/HugoRodriguesQW/simplifiga/main/public/email_logo.png"
                    title="Simplifiga"
                    alt="Simplifiga"
                  />
                </a>
              </td>
            </tr>
            <tr>
              <td style="height: 20px">&nbsp;</td>
            </tr>
            <tr>
              <td>
                <table
                  width="95%"
                  border="0"
                  align="center"
                  cellpadding="0"
                  cellspacing="0"
                  style="
                    max-width: 670px;
                    background: #fff;
                    border-radius: 3px;
                    text-align: center;
                    -webkit-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                    -moz-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                    box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                  "
                >
                  <tr>
                    <td style="height: 40px">&nbsp;</td>
                  </tr>
                  <tr>
                    <td style="padding: 0 35px">
                      <h1
                        style="
                          color: #1e1e2d;
                          font-weight: 400;
                          margin: 0;
                          font-size: 32px;
                          font-family: Sarala, sans-serif;
                        "
                      >
                        Contato Realizado
                      </h1>
                      <span
                        style="
                          display: inline-block;
                          vertical-align: middle;
                          margin: 29px 0 26px;
                          border-bottom: 1px solid #cecece;
                          width: 100px;
                        "
                      ></span>
                      <p
                        style="
                          color: #455056;
                          font-size: 15px;
                          line-height: 24px;
                          margin: 0;
                        "
                      >
                        ${message}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="height: 20px">&nbsp;</td>
                  </tr>
                  <tr>
                    <td style="padding: 0 35px">
                      <h2
                        style="
                          color: #1e1e2d;
                          font-weight: 400;
                          margin: 0;
                          font-size: 18px;
                          font-family: Sarala, sans-serif;
                        "
                      >
                        Informação do usuário
                      </h2>
                      <p
                        style="
                          color: #455056;
                          font-size: 15px;
                          line-height: 24px;
                          margin: 0;
                        "
                      >
                        <strong>Nome: </strong>${name}
                      </p>
                      <p
                        style="
                          color: #455056;
                          font-size: 15px;
                          line-height: 24px;
                          margin: 0;
                        "
                      >
                        <strong>Email: </strong>${email}
                      </p>
                      <p
                        style="
                          color: #455056;
                          font-size: 15px;
                          line-height: 24px;
                          margin: 0;
                        "
                      >
                        <strong>Premium: </strong>${upgraded}
                      </p>
                    </td>
                  </tr>
  
                  <tr>
                    <td style="height: 40px">&nbsp;</td>
                  </tr>
                </table>
              </td>
            </tr>
  
            <tr>
              <td style="height: 20px">&nbsp;</td>
            </tr>
            <tr>
              <td style="text-align: center">
                <a
                  href="https://simplifi.ga/"
                  target="_blank"
                  style="text-decoration: none !important"
                  ><p
                    style="
                      font-size: 14px;
                      color: rgba(69, 80, 86, 0.7411764705882353);
                      line-height: 18px;
                      margin: 0 0 0;
                    "
                  >
                    &copy; <strong>simplifi.ga</strong>
                  </p></a
                >
              </td>
            </tr>
            <tr>
              <td style="height: 80px">&nbsp;</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <!-- CREDITS: RaKesh Mandal https://codepen.io/rKalways/pen/VwwQKpV -->
  </body>
  `,
  };
}

export function ContactServiceEmail({ message, email, name, logged }) {
  return {
    text: `Simplifi.ga
    ---
    Contato Realizado
    ---
    ${message}
    ---
    Informação do usuário:
    ---
    Nome: ${name}
    Email: ${email}
    Login: ${logged ? "Registrado" : "Visitante"}
    ---
    © simplifi.ga`,
    html: `<body
    marginheight="0"
    topmargin="0"
    marginwidth="0"
    style="margin: 0px; background-color: #f2f3f8"
    leftmargin="0"
  >
    <!--100% body table-->
    <table
      cellspacing="0"
      border="0"
      cellpadding="0"
      width="100%"
      bgcolor="#f2f3f8"
      style="
        @import url(https://fonts.googleapis.com/css2?family=Sarala:wght@400;700|Open+Sans:wght@400,700);
        font-family: Sarala, 'Open Sans', sans-serif;
      "
    >
      <tr>
        <td>
          <table
            style="background-color: #f2f3f8; max-width: 670px; margin: 0 auto"
            width="100%"
            border="0"
            align="center"
            cellpadding="0"
            cellspacing="0"
          >
            <tr>
              <td style="height: 80px">&nbsp;</td>
            </tr>
            <tr>
              <td style="text-align: center">
                <a href="https://simplifi.ga/" title="logo" target="_blank">
                  <img
                    height="40"
                    src="https://raw.githubusercontent.com/HugoRodriguesQW/simplifiga/main/public/email_logo.png"
                    title="Simplifiga"
                    alt="Simplifiga"
                  />
                </a>
              </td>
            </tr>
            <tr>
              <td style="height: 20px">&nbsp;</td>
            </tr>
            <tr>
              <td>
                <table
                  width="95%"
                  border="0"
                  align="center"
                  cellpadding="0"
                  cellspacing="0"
                  style="
                    max-width: 670px;
                    background: #fff;
                    border-radius: 3px;
                    text-align: center;
                    -webkit-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                    -moz-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                    box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                  "
                >
                  <tr>
                    <td style="height: 40px">&nbsp;</td>
                  </tr>
                  <tr>
                    <td style="padding: 0 35px">
                      <h1
                        style="
                          color: #1e1e2d;
                          font-weight: 400;
                          margin: 0;
                          font-size: 32px;
                          font-family: Sarala, sans-serif;
                        "
                      >
                        Contato Realizado
                      </h1>
                      <span
                        style="
                          display: inline-block;
                          vertical-align: middle;
                          margin: 29px 0 26px;
                          border-bottom: 1px solid #cecece;
                          width: 100px;
                        "
                      ></span>
                      <p
                        style="
                          color: #455056;
                          font-size: 15px;
                          line-height: 24px;
                          margin: 0;
                        "
                      >
                        ${message}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="height: 20px">&nbsp;</td>
                  </tr>
                  <tr>
                    <td style="padding: 0 35px">
                      <h2
                        style="
                          color: #1e1e2d;
                          font-weight: 400;
                          margin: 0;
                          font-size: 18px;
                          font-family: Sarala, sans-serif;
                        "
                      >
                        Informação do usuário
                      </h2>
                      <p
                        style="
                          color: #455056;
                          font-size: 15px;
                          line-height: 24px;
                          margin: 0;
                        "
                      >
                        <strong>Nome: </strong>${name}
                      </p>
                      <p
                        style="
                          color: #455056;
                          font-size: 15px;
                          line-height: 24px;
                          margin: 0;
                        "
                      >
                        <strong>Email: </strong>${email}
                      </p>
                      <p
                        style="
                          color: #455056;
                          font-size: 15px;
                          line-height: 24px;
                          margin: 0;
                        "
                      >
                        <strong>Login: </strong>${
                          logged ? "Registrado" : "Visitante"
                        }
                      </p>
                    </td>
                  </tr>
  
                  <tr>
                    <td style="height: 40px">&nbsp;</td>
                  </tr>
                </table>
              </td>
            </tr>
  
            <tr>
              <td style="height: 20px">&nbsp;</td>
            </tr>
            <tr>
              <td style="text-align: center">
                <a
                  href="https://simplifi.ga/"
                  target="_blank"
                  style="text-decoration: none !important"
                  ><p
                    style="
                      font-size: 14px;
                      color: rgba(69, 80, 86, 0.7411764705882353);
                      line-height: 18px;
                      margin: 0 0 0;
                    "
                  >
                    &copy; <strong>simplifi.ga</strong>
                  </p></a
                >
              </td>
            </tr>
            <tr>
              <td style="height: 80px">&nbsp;</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <!-- CREDITS: RaKesh Mandal https://codepen.io/rKalways/pen/VwwQKpV -->
  </body>  
  `,
  };
}

export default function ResetEmail(code) {
  return {
    text: `
      Simplifi.ga
      ---
      Solicitação de Redefinição de senha.
      Utilize o código abaixo na mesma página em que foi solicitado para prosseguir com a redefinição de senha. Este código é exclusivo, expira em 10 minutos e não deve ser compartilhado com ninguém.
      ---
      Código: ${code}
      ---
      © simplifi.ga
    `,
    html: `
  <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
    <!--100% body table-->
    <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
        style="@import url(https://fonts.googleapis.com/css2?family=Sarala:wght@400;700|Open+Sans:wght@400,700); font-family: Sarala, 'Open Sans', sans-serif;">
        <tr>
            <td>
                <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                    align="center" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="height:80px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td style="text-align:center;">
                          <a href="https://simplifi.ga/" title="logo" target="_blank">
                            <img height="40" src="https://raw.githubusercontent.com/HugoRodriguesQW/simplifiga/main/public/email_logo.png" title="Simplifiga" alt="Simplifiga">
                          </a>
                        </td>
                    </tr>
                    <tr>
                        <td style="height:20px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td>
                            <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style="padding:0 35px;">
                                        <h1 style="color:#1e1e2d; font-weight:400; margin:0;font-size:32px;font-family:Sarala,sans-serif;">Solicitação de redefinição de senha</h1>
                                        <span
                                            style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                        <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                            Utilize o código abaixo na mesma página em que foi solicitado para prosseguir com a redefinição de senha. Este código é exclusivo, <strong>expira em 10 minutos</strong> e não deve ser compartilhado com ninguém.
                                        </p>

                                        <span href="javascript:void(0);"
                                            style="background: #005bff;font-weight:700; margin-top:35px; color:#fff;text-transform:uppercase; font-size:20px;padding:10px 24px;display:inline-block;border-radius:5px;">
                                            ${code}
                                        </span>

                                    </td>
                                </tr>
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                            </table>
                        </td>
                    <tr>
                        <td style="height:20px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td style="text-align:center;">
                            <a  href="https://simplifi.ga/" target="_blank" style="text-decoration: none !important;"><p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>simplifi.ga</strong></p></a>
                        </td>
                    </tr>
                    <tr>
                        <td style="height:80px;">&nbsp;</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <!-- CREDITS: RaKesh Mandal https://codepen.io/rKalways/pen/VwwQKpV -->
  </body>
  `,
  };
}
