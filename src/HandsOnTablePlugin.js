import React, {useRef, useState} from 'react'
import { HotTable } from '@handsontable/react';
// import Handsontable from "handsontable";

const mok =  {
  watch: ['2', '3', '4'],
  target: '5',
  formula: '=[3]*[4]/[2]'
}

const data = [
  {1: 'Январь 2021', 2: '100', '5': '', mok1: 1},
  {1: 'Февраль 2021'},
  {1: 'Март 2021'},
  {1: 'Апрель 2021'},
  {1: 'Май 2021'},
  {1: 'Июнь 2021'},
  {1: 'Июль 2021'},
  {1: 'Август 2021'},
  {1: 'Сентябрь 2021'},
  {1: 'Октябрь 2021'},
  {1: 'Ноябрь 2021'},
  {1: 'Ноябрь 2021'},
  {1: 'Декабрь 2021'},
]
const settings = {
  data: data,
  // columnHeaderHeight: 100,
  // colWidths: 200,
  // rowHeaders: true,
  colHeaders: true,
  width: '100%',
  height: 500,
  formulas: true,
  autoColumnSize: {useHeaders: true},
  copyPaste: true,
  nestedHeaders: [
    [
      '<span class="wrap-header">Период</span>',
      '<span class="wrap-header">Средняя заработная плата субъекта Российской Федерации (прогноз среднемесячного дохода от трудовой деятельности в 2021 г.) (тыс.руб.)</span>',
      '<span class="wrap-header">Численность профессорско-преподавательского состава образовательных организаций, реализующего программы высшего образования (ППС)</span>',
      '<span class="wrap-header">Фонд начисленной заработной платы ППС***(тыс.руб.)</span>',
      '<span class="wrap-header">% достижения средней заработной платы субъекта Российской Федерации по ППС</span>',
      '<span class="wrap-header">Численность научных сотрудников (НС)</span>',
      '<span class="wrap-header">Фонд начисленной заработной платы НС (тыс.руб.)</span>',
      '<span class="wrap-header">% достижения средней заработной платы субъекта Российской Федерации по НС</span>',
    ],
    [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
    ]
  ],
  columns: [
    {
      data: '1'
    },
    {
      data: '2',
      type: 'numeric'
    },
    {
      data: '3',
      type: 'numeric'
    },
    {
      data: '4',
      type: 'numeric',
    },
    {
      data: '5',
      readOnly: true
    },
    {
      data: '6',
      type: 'numeric'
    },
    {
      data: '7',
      type: 'numeric'
    },
    {
      data: '8',
      readOnly: true
    },
  ],
  // contextMenu: {
  //   items: {
  //     'row_above': {
  //       name: 'Вставить строку до'
  //     },
  //     'row_below': {
  //       name: 'Вставить строку после'
  //     },
  //     'separator': Handsontable.plugins.ContextMenu.SEPARATOR,
  //     'clear_custom': {
  //       name: 'Очистить все строки',
  //       callback: function () {
  //         this.clear();
  //       }
  //     }
  //   }
  // },
  licenseKey: 'non-commercial-and-evaluation'
}

export const HandsOnTablePlugin = () => {
  const handOnTableRef = useRef(null)
  const [settingsState, setSettingsState] = useState(settings)

  // useEffect(() => {
  //   console.log(handOnTableRef.current.hotInstance.getPlugin('formulas'))
  //
  //   // handOnTableRef.current.updateSettings(settings)
  // }, [])

  // console.log(settingsState)

  const afterChange = (props) => {
    // console.log(props)
    // console.log(props.mok.watch)
    if (props.changes) {
      const [idxRow, idxCell] = props.changes[0]
      // console.log(idxRow, idxCell, prev, value)
      // console.log(idxCell)
      // console.log(props.mok.watch.find(node => node === idxCell))
      if (props.mok.watch.find(node => node === idxCell)) {
        let rowData = handOnTableRef.current.hotInstance.getSourceDataAtRow(idxRow)
        console.log(rowData)
        // console.log(handOnTableRef.current.hotInstance.getSourceData())
        const formula = (+rowData[3] * +rowData[4]) / +rowData[2]
        if (!isNaN(formula)) {
          rowData[props.mok.target] = formula
          // handOnTableRef.current.hotInstance.setDataAtRowProp(idxRow, '', rowData)
          let newData = [...handOnTableRef.current.hotInstance.getSourceData()]
          newData[idxRow] = rowData
          // console.log(newData)
          setSettingsState({
            ...settings,
            data: newData
          })
        } else  {
          // rowData[props.mok.target] = ''
          // let newData = [...handOnTableRef.current.hotInstance.getSourceData()]
          // newData[idxRow] = {...rowData, [props.mok.target]: null}
          // // console.log(newData)
          // setSettingsState({
          //   ...settings,
          //   data: newData
          // })
        }
      }
    }
  }

  const afterChangeSetting = (changes) => {

    if (mok) {
      return afterChange({mok, changes})
    }
  }


  return (
    <div id="hot-app">
      <HotTable
        settings={settingsState}
        ref={handOnTableRef}
        afterChange={changes => afterChangeSetting(changes)}
      />
    </div>
  )
}