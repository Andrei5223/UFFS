from abc import abstractmethod

from Problem.Jogo8.Estado import Estado


class Heuristic:
    def __init__(self, nome: str, objetivo: Estado):
        self.nome: str = nome
        self.objetivo: Estado = objetivo

    @abstractmethod
    def computar(self, estado: Estado) -> int:
        pass


class Heuristic1(Heuristic):

    def __init__(self, objetivo: Estado):
        super().__init__("Quantidade de peças fora do lugar", objetivo)

    def computar(self, estado: Estado) -> int:
        h = 0
        for idx, elemento in enumerate(estado.tabuleiro):
            if elemento != 0 and self.objetivo.tabuleiro[idx] != elemento:
                h += 1
        return h


class Heuristic2(Heuristic):

    def __init__(self, objetivo: Estado):
        super().__init__("Distância de quarteirão", objetivo)

    def computar(self, estado: Estado) -> int:
        h = 0
        for idx, elemento in enumerate(estado.tabuleiro):
            if elemento != 0 and self.objetivo.tabuleiro[idx] != elemento:
                idx_objetivo = abs(elemento - 1)
                h += abs(estado.retornar_coluna_peca(idx) - self.objetivo.retornar_coluna_peca(idx_objetivo))
                h += abs(estado.retornar_linha_peca(idx) - self.objetivo.retornar_linha_peca(idx_objetivo))
        return h

class HeuristicaNova(Heuristic):

    def __init__(self, objetivo: Estado):
        super().__init__("Nova Heuristica", objetivo)

    def computar(self, estado: Estado) -> int:
        h = 0
        max_distancia = 0
        for idx, elemento in enumerate(estado.tabuleiro):
            if elemento != 0 and self.objetivo.tabuleiro[idx] != elemento:
                idx_objetivo = abs(elemento - 1)
                distancia = abs(estado.retornar_coluna_peca(idx) - self.objetivo.retornar_coluna_peca(idx_objetivo)) + \
                            abs(estado.retornar_linha_peca(idx) - self.objetivo.retornar_linha_peca(idx_objetivo))
                max_distancia = max(max_distancia, distancia)
        h = 2 * max_distancia if max_distancia > 0 else 0
        return h
    
class HeuristicaNova2(Heuristic):

    def __init__(self, objetivo: Estado):
        super().__init__("Nova Heuristica 2", objetivo)

    def computar(self, estado: Estado) -> int:
        """
        Esta heurística calcula a soma das distâncias de Manhattan de todas as peças
        que estão fora do lugar, mas dá um peso maior para peças que estão mais distantes
        de suas posições corretas. O peso é proporcional à distância da peça ao seu objetivo.
        """
        h = 0
        for idx, elemento in enumerate(estado.tabuleiro):
            if elemento != 0 and self.objetivo.tabuleiro[idx] != elemento:
                idx_objetivo = abs(elemento - 1)
                # Calcula a distância de Manhattan para a peça atual
                distancia = abs(estado.retornar_coluna_peca(idx) - self.objetivo.retornar_coluna_peca(idx_objetivo)) + \
                            abs(estado.retornar_linha_peca(idx) - self.objetivo.retornar_linha_peca(idx_objetivo))
                # Adiciona a distância ponderada ao valor heurístico
                h += distancia * elemento  # O peso é o valor da peça
        return h