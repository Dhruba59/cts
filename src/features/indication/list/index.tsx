import { useEffect, useMemo, useState } from "react";
import ListHeader from "./listHeader";
import ListTable from "./table/listTable";
import { Indication, IndicationQuery } from "@/model/indication";
import Pagination from "@/components/pagination";
import { get_indication_code_types, get_indications } from "@/service/indication-service";
import { SortingState } from "@tanstack/react-table";
import { LIST_COLUMN } from "./table/columns";
import { DropDownItem, SelectOptionType } from "@/model/drop-down-list";
import { register } from "module";

const IndicationList = () => {

  const [codeTypes, setCodeTypes] = useState<SelectOptionType[]>([]);

  const convertTypeToSelectOption = (
    data: DropDownItem[]
  ): SelectOptionType[] =>
    data?.map((item: DropDownItem) => ({
      label: item.text,
      value: item.value
    }));

    const fetchData = async (query: IndicationQuery) => {
      //console.log(query);
      
      const { data, error }: any = await get_indications(query);
  
      setData(data.items);
      setCurrentPage(data.pageNumber);
      setTotalPages(data.totalPages);
    };
  const fetchDropData = async () => {
    const { data, error }: any = await get_indication_code_types();
    console.log(data);
    setCodeTypes(convertTypeToSelectOption(data.codeTypes));
    console.log(codeTypes);
  };
  
  const columns = useMemo(() => LIST_COLUMN, []);
  //const data = useMemo(() => LIST_DATA, []);
  let indiationQuery = {} as IndicationQuery;

  let indiations = [] as Indication[];

  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<Indication[]>(indiations);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState('');

  const [sorting, setSorting] = useState<SortingState>([
   //{id: "indicationName", desc: false}
  ])
  


   useEffect(() => {

    setSortBy(sorting.map((s) => `${s.id} ${s.desc ? 'asc' : 'desc'}`).join(','));

    console.log(sortBy);

    indiationQuery.pageNumber = currentPage;
    indiationQuery.pageSize = pageSize;
    indiationQuery.orderBy = sortBy === '' || null || undefined ? null : sortBy;

    fetchData(indiationQuery);
    fetchDropData();

  }, []);

  useEffect(() => {

    setSortBy(sorting.map((s) => `${s.id} ${s.desc ? 'asc' : 'desc'}`).join(','));

    console.log(sortBy);

    indiationQuery.pageNumber = currentPage;
    indiationQuery.pageSize = pageSize;
    indiationQuery.orderBy = sortBy === '' || null || undefined ? null : sortBy;

    fetchData(indiationQuery);
  }, [currentPage, pageSize, sorting]);

  const onSubmit = (val: any) => {
    let payload: IndicationQuery = {
      indicationId: 0,
      code: null,
      indicationName: "",
      codeType: "",
      description: null,
      active: null,
      isRequireDetails: null,
      pageNumber: 0,
      pageSize: 0,
      orderBy: null
    }
   
    console.log(val);
  }
  return (
    <main>
      <ListHeader codeTypes ={codeTypes} onSubmit= {onSubmit} />
      <ListTable data={data} columns={columns} sorting={sorting} setSorting={setSorting}/>
      <div className="flex items-center justify-center" >
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          lastPage={totalPages}
          pageSize={pageSize}
          setPageSize={setPageSize}
          maxLength={7}
        />
      </div>
    </main>
  );
};

export default IndicationList;
