import { Controller, Get, Post, Delete, Param, Body, Put, Res } from '@nestjs/common';
import { Gamehistory } from './GameHistory.entity';
import { CreateGameDto } from './CreateGameDto';
import { UpdateScoresDto } from './UpdateScoresDto';
import { GameService } from './GameHistory.service';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get(':id')
  async getGameById(@Param('id') id: number): Promise<Gamehistory> {
    return this.gameService.getGameById(id);
  }

  @Post('create')
  async createGame(@Body() createGameDto: CreateGameDto): Promise<Gamehistory> {
    return this.gameService.createGame(createGameDto);
  }

  @Put(':id/scores')
  async updateGameScore(
    @Param('id') gameId: number,
    @Body() updateScoresDto: UpdateScoresDto) {
    return this.gameService.updateGameScore(gameId, updateScoresDto);
  }

  @Get('user/:userId')
  async findAllGamesByUserId(@Param('userId') userId: number,@Res() res: Response) {
    let th = this;
    return res.send({data:th.gameService.findAllGamesByUserId(userId)});
}
}