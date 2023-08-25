import { StoreDevtoolsModule } from "@ngrx/store-devtools";

export const extModules = [
  StoreDevtoolsModule.instrument({
    name: 'GenesisRomsStateManagement',
    maxAge: 25,
  })
]
