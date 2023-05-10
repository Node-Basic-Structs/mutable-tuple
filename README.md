# MutableTuple

A classe MutableTuple é uma implementação de uma tupla mutável em TypeScript. A tupla mutável é uma estrutura de dados semelhante a uma lista em que cada elemento tem um índice numérico que começa em zero. A diferença é que a tupla mutável tem um tamanho fixo e os elementos não podem ser adicionados ou removidos depois que a tupla é criada. No entanto, é possível alterar os valores dos elementos.

Esta classe oferece métodos para criar uma nova tupla, definir e obter valores dos elementos da tupla, concatenar com outra tupla, encontrar valores e índices, e iterar sobre os elementos da tupla.

# Instalação

Para instalar a classe MutableTuple em seu projeto, basta executar o seguinte comando:

```bash
npm install @basic-structs/mutable-tuple
```


# Uso

Para usar a classe MutableTuple em seu projeto, basta importá-la e instanciá-la. Aqui está um exemplo:
```typescript
import { MutableTuple } from '@basic-structs/mutable-tuple';

const tuple = new MutableTuple('hello', 42, true);

tuple.set(0, 'world');
tuple.get(1); // 42

const newTuple = tuple.concat(new MutableTuple(false, 3.14));
newTuple.length; // 5

tuple.forEach((value, index) => {
  console.log(`[${index}] ${value}`);
});

const found = tuple.find(42);
if (found !== tuple.NotFound) {
  console.log(`Found: ${found}`);
}

const index = tuple.findIndex((value) => typeof value === 'boolean');
console.log(`Index: ${index}`);

const filtered = tuple.filter((value) => typeof value === 'string');
console.log(`Filtered: ${filtered}`);
```

# Métodos

## Função `set`

A função `set` é utilizada para modificar o valor de um elemento do `MutableTuple` em um determinado índice.

### Parâmetros

* index: Um número inteiro que representa o índice do elemento a ser modificado. Deve ser um número entre 0 e o comprimento do `MutableTuple` menos 1.
* value: O novo valor a ser atribuído ao elemento do `MutableTuple`.

### Restrições

* Se o índice especificado estiver fora dos limites do `MutableTuple` (ou seja, menor que 0 ou maior ou igual ao comprimento do `MutableTuple`), um erro será lançado com uma mensagem de erro apropriada.

* Se o tipo de value não for compatível com o tipo do elemento do `MutableTuple` correspondente ao índice especificado, um erro será lançado com uma mensagem de erro apropriada.

### Exemplo de uso

Exemplo 1: Modificar um elemento do `MutableTuple`.

```typescript
const tuple = new MutableTuple(1, 2, 3);
tuple.set(1, 'a'); // modifica o segundo elemento de 2 para 'a'
console.log(tuple.values); // [1, 'a', 3]
```

Exemplo 2: Tentar modificar um elemento em um índice fora dos limites.

```typescript
const tuple = new MutableTuple(1, 2, 3);
tuple.set(5, 'a'); // lança um erro "Index out of bounds: 5"
```

Exemplo 3: Tentar modificar um elemento com um valor de tipo incompatível.

```typescript
const tuple = new MutableTuple(1, 2, 3);
tuple.set(1, true); // lança um erro "Type mismatch: expected number, received boolean"
```

### Observações

* A função `set` modifica o `MutableTuple` atual.

---

## Função `get`

Retorna o valor armazenado em um determinado índice do `MutableTuple`.

### Parâmetros

* `index`: índice do elemento que se deseja awcessar.

### Restrições

* O `index` deve ser um número inteiro válido dentro do intervalo `[0, length)`.

### Exemplo de uso

```typescript
const tuple = new MutableTuple(1, 2, 3, 4, 5);
console.log(tuple.get(0)); // Output: 1
console.log(tuple.get(2)); // Output: 3
console.log(tuple.get(tuple.length - 1)); // Output: 5
```

Exemplos de erros:

```typescript
const tuple = new MutableTuple(1, 2, 3);
console.log(tuple.get(-1)); // throws Error("Index out of bounds: -1")
console.log(tuple.get(3)); // throws Error("Index out of bounds: 3")
```

### Observações

* Caso o `index` seja inválido, será lançado um erro com mensagem "Index out of bounds: `<index>`".
* O tipo do valor retornado será inferido pelo tipo do elemento do índice informado. Por exemplo, ao chamar `get(0)` em um `MutableTuple` de `string[]`, o valor retornado terá tipo `string`.

## Função concat
Concatena duas MutableTuple em uma nova MutableTuple.

### Parâmetros

* `mutableTuple`: uma MutableTuple para concatenar com a atual.

### Restrições

* Ambas as MutableTuple devem ter o mesmo tamanho.

### Exemplo de uso:

```typescript
const tuple1 = new MutableTuple(1, 2, 3);
const tuple2 = new MutableTuple('a', 'b', 'c');
const tuple3 = tuple1.concat(tuple2);

console.log(tuple3); // MutableTuple { _values: [ 1, 2, 3, 'a', 'b', 'c' ], _length: 6, NotFound: Symbol(NotFound) }
```

```typescript
const tuple1 = new MutableTuple(1, 2, 3);
const tuple2 = new MutableTuple('a', 'b');

expect(() => tuple1.concat(tuple2)).toThrowError('The tuples should have the same length');
```

### Observações

A função cria uma nova MutableTuple em que o conteúdo de ambas as MutableTuple é colocado em ordem na nova MutableTuple. É importante lembrar que a nova MutableTuple criada não tem nenhuma relação com as MutableTuple originais e que qualquer alteração feita na nova MutableTuple não afetará as originais. É necessário que ambas as MutableTuple tenham o mesmo tamanho, caso contrário, um erro será lançado.

Entendi! Desculpe pelo equívoco. Seguindo as novas instruções, segue a documentação da função `forEach`:

## Função `forEach`

Esta função itera sobre os elementos de um MutableTuple executando a função de callback uma vez para cada elemento.

#### Parâmetros

* `callbackfn`: Função a ser executada para cada elemento, recebendo dois argumentos:
  * `value`: Valor do elemento atual sendo processado.
  * `index`: Índice do elemento atual sendo processado.

### Restrições

Nenhuma restrição.

### Exemplo de uso

```typescript
const tuple = new MutableTuple(1, 2, 3);

tuple.forEach((value, index) => {
    console.log(`O elemento ${value} está no índice ${index}.`);
});

// Output:
// O elemento 1 está no índice 0.
// O elemento 2 está no índice 1.
// O elemento 3 está no índice 2.
```

Caso ocorra um erro dentro da função de callback, ele será lançado e interromperá a iteração.

### Observações

Nenhuma observação adicional.

Peço desculpas pelo equívoco. Vou refazer seguindo o padrão:

## Função find

A função `find` retorna o valor do primeiro elemento no MutableTuple que satisfaz a função de callback fornecida. Se nenhum valor satisfizer a função de callback, a função retornará o símbolo NotFound.

### Parâmetros

* `callbackfn`: Uma função de callback que é chamada para cada elemento no MutableTuple. A função recebe dois argumentos:
  * `value`: O valor do elemento atual sendo processado no MutableTuple.
  * `index`: O índice do elemento atual sendo processado no MutableTuple.
  * Retorna um valor booleano que indica se o elemento atual satisfaz a condição especificada na função de callback.

### Restrições

* `callbackfn` deve ser uma função.

### Exemplo de uso

```typescript
const tuple = new MutableTuple("foo", "bar", "baz");

const foundValue = tuple.find(value => value.startsWith("b"));

if (foundValue !== tuple.NotFound) {
    console.log(foundValue); // "bar"
} else {
    console.log("Value not found.");
}

```

### Observações

Se o `callbackfn` não retornar um valor booleano, o `find` não terá o comportamento esperado.

---

## Função findIndex

A função `findIndex` percorre os elementos do MutableTuple e retorna o índice do primeiro elemento que satisfaz a função de callback fornecida.

### Parâmetros

* `callbackfn`: Uma função que deve ser chamada para cada valor do MutableTuple. Cada valor será passado como argumento para a função. A função deve retornar `true` se o valor satisfaz uma condição, e `false` caso contrário. A função de callback recebe dois parâmetros:
  * `value`: O valor atual do MutableTuple sendo processado.
  * `index`: O índice atual do valor do MutableTuple sendo processado.

### Restrições

* A função de callback deve ser fornecida como argumento.
* Se nenhum elemento satisfizer a condição especificada na função de callback, a função retorna -1.

### Exemplo de uso:

```typescript
// Exemplo de uso da função findIndex

// Criação de um MutableTuple de números
const numbers = new MutableTuple(10, 20, 30, 40, 50);

// Procura pelo índice do valor 30 no MutableTuple
const index = numbers.findIndex((value) => value === 30);

// Verifica se o valor foi encontrado
if (index !== -1) {
  console.log(`O índice do valor 30 é: ${index}`); // O índice do valor 30 é: 2
} else {
  console.log('Valor não encontrado');
}

// Procura pelo índice do valor 60 no MutableTuple
const index2 = numbers.findIndex((value) => value === 60);

// Verifica se o valor foi encontrado
if (index2 !== -1) {
  console.log(`O índice do valor 60 é: ${index2}`);
} else {
  console.log('Valor não encontrado'); // Valor não encontrado
}


```

### Observações:

* É importante observar que a função retorna o índice do primeiro elemento que satisfaz a condição, portanto, se houver mais de um elemento que atenda às condições da função de callback, apenas o índice do primeiro será retornado.

---

Claro! Segue a documentação revisada da função filter:

## Função filter

Esta função cria um novo MutableTuple com todos os elementos que passam no teste implementado pela função fornecida.

### Parâmetros:

* `callbackfn`: `(value: T[number], index: number) => boolean` - Função a ser chamada para cada elemento do MutableTuple. Ela recebe dois argumentos:
  * `value` - O valor do elemento do MutableTuple.
  * `index` - O índice do elemento do MutableTuple.
Deve retornar um valor booleano.

### Restrições:

Nenhuma.

### Exemplo de uso:

```typescript
// Criando um MutableTuple de números
const tuple = new MutableTuple<number>(1, 2, 3, 4, 5);

// Criando um novo MutableTuple apenas com os números pares
const evenNumbers = tuple.filter((value, index) => {
  // Inclui o elemento apenas se o seu índice é par e o valor é par
  return index % 2 === 0 && value % 2 === 0;
});

console.log(evenNumbers.toArray()); // [2, 4]

// Outro exemplo: filtrando palavras de um MutableTuple de strings
const words = new MutableTuple<string>('hello', 'world', 'typescript', 'mutable', 'tuple');
const shortWords = words.filter((word) => word.length <= 5);
console.log(shortWords.toArray()); // ['hello', 'world', 'tuple']

// Tratando a possibilidade de NotFound
const moreWords = new MutableTuple<string>('hello', 'world', 'typescript', 'mutable', 'tuple');
const longerWords = moreWords.filter((word) => word.length > 7);
if (longerWords.length === 0) {
  console.log('Nenhum elemento encontrado.');
} else {
  console.log(longerWords.toArray());
}
```

### Observações:

A função filter cria um novo MutableTuple com os elementos que passam no teste. Se nenhum elemento passar, será retornado um MutableTuple vazio.

---

## Função includes

A função `includes` determina se o `MutableTuple` inclui um determinado valor entre seus elementos, retornando true ou false conforme apropriado.

### Parâmetros

* `value`: O valor a ser procurado.

### Restrições

* Nenhuma.

### Exemplo de uso:

```typescript
const tuple = new MutableTuple("a", "b", "c");

tuple.includes("a"); // true
tuple.includes("d"); // false
```

### Observações

* Se o `MutableTuple` contém valores primitivos ou objetos, a comparação é feita usando a operação de igualdade estrita (`===`), o que significa que tipos diferentes de valores nunca serão iguais entre si, mesmo que o conteúdo possa ser o mesmo.
  
---

## Função `indexOf`

Retorna o índice da primeira ocorrência de um determinado valor dentro do `MutableTuple`, ou -1 se não for encontrado.

### Parâmetros

- `value`: Valor a ser procurado dentro do `MutableTuple`.

### Restrições

* Nenhuma.

### Exemplo de uso

```typescript
const tuple = new MutableTuple('a', 'b', 'c');
console.log(tuple.indexOf('b')); // 1
console.log(tuple.indexOf('d')); // -1
```

### Observações

* A comparação de igualdade é feita utilizando o operador `===`.
* Essa função retorna apenas a primeira ocorrência do valor no `MutableTuple`.

---

## Função lastIndexOf

Retorna o índice da última ocorrência de um valor especificado em um mutable tuple, ou -1 se não encontrado.

### Parâmetros

* `value`: valor a ser procurado no mutable tuple.

### Restrições

Nenhuma.

### Exemplo de uso:

```typescript
const tuple = new MutableTuple(2, 3, 1, 2, 3);
const index1 = tuple.lastIndexOf(3); // Retorna 4
const index2 = tuple.lastIndexOf(4); // Retorna -1
```

```typescript
const tuple = new MutableTuple('foo', 'bar', 'baz', 'foo');
const index1 = tuple.lastIndexOf('foo'); // Retorna 3
const index2 = tuple.lastIndexOf('qux'); // Retorna -1
```

### Observações

* Se a pesquisa é feita em um mutable tuple vazio, a função sempre retornará -1.

---

## Função some

A função `some` retorna um valor booleano que indica se pelo menos um dos elementos do `MutableTuple` atende aos critérios especificados em uma função de retorno.

### Parâmetros

* `callbackfn`: uma função de retorno que será chamada para cada elemento do `MutableTuple`. Esta função recebe dois argumentos:
  * `value: T[number]`: o valor do elemento atual no `MutableTuple`.
  * `index: number`: o índice do elemento atual no `MutableTuple`.

### Restrições

Nenhuma restrição.

### Exemplo de uso

```typescript
const tuple = new MutableTuple(1, 2, 3);

// Verifica se pelo menos um elemento é igual a 2
const result1 = tuple.some((value) => value === 2); // true

// Verifica se pelo menos um elemento é maior do que 3
const result2 = tuple.some((value) => value > 3); // false

// Verifica se pelo menos um elemento é igual a 4
const result3 = tuple.some((value) => value === 4); // false
```

### Observações

Caso nenhum elemento atenda aos critérios especificados na função de retorno, a função `some` retornará `false`.

---

# Função every

Retorna um valor booleano que indica se todos os elementos de um MutableTuple passam pelo teste implementado pela função fornecida.

### Parâmetros

* `callbackfn`: Função a ser chamada para cada elemento do `MutableTuple`. Ela recebe dois argumentos:
  * `value`: Valor do elemento;
  * `index`: Índice do elemento no `MutableTuple`.
  

### Restrições

* Se a função `callbackfn` não retornar um valor booleano para qualquer elemento do MutableTuple, o método every retornará `false`.

### Exemplo de uso:

```typescript
const mutableTuple = new MutableTuple(1, 2, 3, 4, 5);
const isEven = (value: number) => value % 2 === 0;

// Exemplo 1: Verificar se todos os elementos são pares
const result1 = mutableTuple.every(isEven); // Retorna false

// Exemplo 2: Verificar se todos os elementos são maiores que 0
const result2 = mutableTuple.every((value: number) => value > 0); // Retorna true

// Exemplo 3: Verificar se todos os elementos são números
const result3 = mutableTuple.every((value: number) => typeof value === 'number'); // Retorna true

// Exemplo 4: Erro - o callbackfn não retorna um valor booleano
const result4 = mutableTuple.every((value: number) => value); // Lança um erro
```

### Observações

* A função `every` não modifica o MutableTuple em que foi chamado.

---

# Função reduce

Descrição básica:
A função reduce recebe uma função de callback e um valor inicial e executa essa função em cada elemento do MutableTuple, acumulando um valor ao longo do processo. Ao final, o valor acumulado é retornado.

### Parâmetros

* `callbackfn` - Função de callback que será executada para cada elemento do MutableTuple. Ela recebe três argumentos:
  * `previousValue` - O valor acumulado até o momento.
  * `currentValue` - O valor atual do elemento sendo percorrido.
  * `currentIndex` - O índice atual do elemento sendo percorrido.
* `initialValue` - O valor inicial para o acumulador. Se não for fornecido, o primeiro valor do MutableTuple será usado como valor inicial.

### Restrições

* A função de callback deve retornar o valor acumulado a cada iteração.
* Se o MutableTuple estiver vazio e o valor inicial não tiver sido fornecido, um erro será lançado com uma mensagem de erro apropriada.

### Exemplo de uso:

```typescript
const tuple = new MutableTuple(1, 2, 3, 4, 5);

// Somando os valores do MutableTuple
const sum = tuple.reduce((previousValue, currentValue) => previousValue + currentValue);

console.log(sum); // 15

// Usando valor inicial diferente de zero
const initialValue = 10;
const sumWithInitialValue = tuple.reduce((previousValue, currentValue) => previousValue + currentValue, initialValue);

console.log(sumWithInitialValue); // 25

// Lançando um erro quando o MutableTuple estiver vazio e o valor inicial não tiver sido fornecido
const emptyTuple = new MutableTuple();
emptyTuple.reduce((previousValue, currentValue) => previousValue + currentValue); // Error: Cannot reduce an empty tuple without an initial value.
```

### Observações

* A função `callbackfn` é executada uma vez para cada elemento do MutableTuple, excluindo o primeiro elemento (a menos que `initialValue` seja definido como um valor diferente de `undefined`). 
* Se o MutableTuple estiver vazio e `initialValue` não for especificado, um erro será lançado.
* Se o MutableTuple tiver apenas um elemento e `initialValue` não for especificado, o primeiro elemento será retornado.
* É importante observar que a função `callbackfn` deve ser uma função pura, isto é, deve produzir o mesmo resultado sempre que for chamada com os mesmos argumentos. Qualquer efeito colateral deve ser evitado para garantir a corretude do algoritmo de redução.


# Tipos

Nesta seção são apresentados os tipos exportados pela classe MutableTuple.

Com certeza! Aqui está o exemplo atualizado:



## TupleLength

O tipo TupleLength é uma intersecção de uma faixa numérica de 0 até o tamanho do array genérico T, que é usado para tipar o índice em MutableTuple.

### Exemplo de uso:

```typescript
type MyTuple = [string, number];
const tuple = new MutableTuple<MyTuple>("foo", 42);

const index: number = 1;
const value = tuple.get(index); // Error: Argument of type 'number' is not assignable to parameter of type 'TupleLength<MyTuple>'
```

Caso tente acessar um elemento diretamente sem a conversão para TupleLength, pode ocorrer um erro devido à tipagem incorreta. Para corrigir o erro, basta converter o índice para o tipo `TupleLength` como mostrado abaixo:

```typescript
type MyTuple = [string, number];
const tuple = new MutableTuple<MyTuple>("foo", 42);

const index: number = 1;
const value = tuple.get(index as TupleLength<MyTuple>);
console.log(value); // Output: 42
```

Dessa forma, o TypeScript consegue inferir corretamente a tipagem do índice e o código é executado sem erros.

# Considerações finais

Concluímos, então, a documentação da classe MutableTuple, onde vimos todos os seus métodos, parâmetros, restrições e exemplos de uso. Esperamos que tenha sido uma leitura útil e esclarecedora para aqueles que desejam utilizar esta classe em seus projetos em TypeScript. Salientamos que esta é apenas uma documentação básica, portanto, recomendamos a leitura da documentação oficial do TypeScript para um conhecimento mais completo da linguagem. Caso tenha alguma dúvida ou sugestão, por favor, não hesite em entrar em contato.
