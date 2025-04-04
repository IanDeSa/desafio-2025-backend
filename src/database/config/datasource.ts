import { DataSource, DataSourceOptions } from 'typeorm';
import { typeOrmConfig } from './config';

const mariadbDataSource = new DataSource(typeOrmConfig as DataSourceOptions);

export default mariadbDataSource;
