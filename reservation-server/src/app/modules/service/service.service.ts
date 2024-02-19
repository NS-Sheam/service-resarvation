import QueryBuilder from "../../builder/QueryBuilder";
import { serviceSearchableFields } from "./service.const";
import { TService } from "./service.interface";
import { Service } from "./service.model";

const addService = async (payload: TService) => {
  const result = await Service.create(payload);
  return result;
};

const getAllServices = async (query: Record<string, unknown>) => {
  const serviceQuery = new QueryBuilder(
    Service.find().populate("provider"),
    query,
  )
    .search(serviceSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await serviceQuery.modelQuery;

  const meta = await serviceQuery.countTotal();
  return { result, meta };
};
