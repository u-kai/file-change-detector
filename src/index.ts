import { AutoExecuter } from './classes/mains/auto-executer/AutoExecuter'
if (require.main) {
    new AutoExecuter().run()
}
