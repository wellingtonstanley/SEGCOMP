# SEGCOMP
projeto final de segurança computacional - diffie hellman

O Algoritmo Diffie-Hellman

Imaginem que Alice e Bob queiram trocar e-mails secretos de forma segura*. Porém, os dois nunca tiveram oportunidade de combinar uma PSK (Pre-Shared key) de forma segura. Como fazer?

Suponha que Alice tenha mandado o seguinte e-mail para Bob:

Bob, vamos utilizar o algoritmo Diffie-Hellman para trocar uma chave pública. Esta chave, combinada com um algoritmo de criptografia AES (Advanced Encryption Standard), também conhecido por Rijndael, de 256 bits, fará com que o conteúdo de nossos e-mails sejam encriptados. Assim, só quem conhece a chave privada (que será gerada pelo algoritmo Diffie-Hellman e só nós vamos conhecer) poderá ler o e-mail. Ficou complicado? Vou te explicar como funciona o algoritmo Diffie-Hellman:

1. Eu escolherei dois números que utilizaremos em comum. A = 7 e B = 11.

2. Escolho um número que só eu sei, que chamarei de X. Você também escolhe um número (não conte a ninguém), chamado de Y.

3. Eu aplico a seguinte fórmula: ka = (a^x) mod B. E vou te passar o resultado ka.

4. Você aplica a mesma fórmula, substituindo X pelo seu número secreto Y. kb = (a ^ y) mod B. E você me passará o valor de kb.

5. Agora, eu aplico a seguinte fórmula para descobrir nossa chave privada: PSK = (kb ^ x) mod B.

6. Para você descobrir a chave privada, use a fórmula: PSK = (ka ^ y) mod B.

7. Agora, é só nos dois utilizarmos a chave privada como insumo na função de criptografia AES.

Não se preocupe em alguém saber A, B, ka e kb. Mesmo sabendo esses valores, ficará quase impossível alguém descobrir qual os números X ou Y que geraram a chave privada.

Qualquer dúvida me liga!

Alice.

A partir deste momento, se Alice enviar um e-mail para Bob encriptado por AES-256, utilizando a chave PSK, somente quem souber essa chave (Bob ou Alice) poderá desencriptar o e-mail e ler seu conteúdo.

Descobrindo a Chave
Para descobrir a chave calculada, é preciso utilizar a fórmula: ka = (x^a) mod b.

Como vocês podem ver, as combinações de pares X e Y são infinitas e é muito difícil que alguém consiga descobrir os dois números.

Considerações
Mesmo que se conheça A, B, ka e kb, não é possível descobrir PSK por outro método que não seja a “força bruta”, ou seja, testar cada valor de X e Y.

Num primeiro momento, pode parecer fácil para um computador testar em questão de minutos (ou mesmo horas) os valores possíveis e descobrir PSK.

Mas o exemplo acima foi meramente didático. Na prática, os valores de A, B, X e Y são grandes, na casa de pelo menos 6 dígitos.

Com números dessa grandeza, é necessário computadores “potentes” para executar esses cálculos.

Além disso, existem outros fatores matemáticos para a determinação de A, B, X e Y que podem dificultar exponencialmente a descoberta de X e Y.

ejs = basicamente conseguimos utilizar códigos em javascript no html de nossas páginas.
