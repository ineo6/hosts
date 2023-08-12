import parser from 'yargs-parser'
import {updateNextHosts} from './hosts'

const argv = parser(process.argv.slice(2))

updateNextHosts()
