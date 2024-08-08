export type PowerBallResponse = {
  DrawResults: [
    {
      ProductId: string;
      DrawNumber: number;
      DrawDate: string;
      DrawDisplayName: string;
      DrawLogoUrl: string;
      PrimaryNumbers: number[];
      SecondaryNumbers: number[];
      TicketNumbers: null;
      Dividends: Dividend[];
    }
  ];
  ErrorInfo: null;
  Success: boolean;
};

export type Dividend = {
  Division: number;
  BlocNumberOfWinners: number;
  BlocDividend: number;
  CompanyId: string;
  CompanyNumberOfWinners: number;
  CompanyDividend: number;
  PoolTransferType: string;
  PoolTransferredTo: number;
  PrizeBoostValue: number;
};
